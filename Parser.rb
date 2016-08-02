#!/usr/bin/env ruby
=begin
en-us
	This script reads a template file and puts in stdout the javascript code that assigns
	the template members as functions
	
	Use mode: ./Parser.rb [file to read] [Hash name]
	Exemplo: ./Parser.rb foo.html.pftemplate Bar 
	
	wich will produce:
		Bar["templateTeste"] = function(scope){ ... };
		Bar["templateOutro"] = function(scope){ ... };
pt-br
	Esse script lê um arquivo com templates e joga no stdout o código em javascript que 
	atribui os membros templates como funções
	
	Modo de uso: ./Parser.rb [arquivo a ler] [Nome do Hash]
	Example: ./Parser.rb foo.html.pftemplate Bar 
	
	que produzirá:
		Bar["templateTeste"] = function(scope){ ... };
		Bar["templateOutro"] = function(scope){ ... };
=end
require "nokogiri"

$open_tag = "{{"
$close_tag = "}}"
$puts_tag = "{{="

input_file = File.open ARGV[0]
$template_object = ARGV[1]
raw_text = input_file.read
def normal_replace string
	first = $open_tag.size
	last = -$close_tag.size-1
	return string.gsub(/#{$open_tag}.*#{$close_tag}/) do |b|
		next %{";
	#{b[first..last]};
	_out+="}.gsub /\\\"/,"\""
	end
end

def puts_replace string
	first = $puts_tag.size
	last = -$close_tag.size-1
	return string.gsub(/#{$puts_tag}.*#{$close_tag}/) do |b|
		next %{";
	_out+=(#{b[first..last]});
	_out+="}.gsub /\\\"/,"\""
	end
end

def surround_function template_name,string
	return %{
#{$template_object}["#{template_name}"]=function(scope){
	with(scope){
		var _out = "";
		_out+="#{string}";
		return _out;
	}
};}
end

def quotes_escape string
	return string.gsub "\"","\\\""
end

def remove_special string
	return string.gsub /\t|\n/,""
end
Nokogiri::XML.fragment(raw_text).css("template").each do |template|
	puts remove_special(surround_function(template.attribute("name"),normal_replace(puts_replace(quotes_escape(template.text)))))
end
