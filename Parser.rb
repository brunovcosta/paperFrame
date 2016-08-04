#!/usr/bin/env ruby
=begin
This script reads a template file and puts in stdout the javascript code that assigns
the template members as functions

Use mode: ./Parser.rb [file to read] [Hash name] [template name]
Example: ./Parser.rb foo.html.pftemplate JST myTemplate

wich will produce:
	JST["myTemplate"] = function(scope){ ... };
=end

$open_tag = "<%"
$close_tag = "%>"
$puts_tag = "<%="

input_file = File.open ARGV[0]
$template_object = ARGV[1]
$template_name = ARGV[2]
raw_text = input_file.read
def normal_replace string
	first = $open_tag.size
	last = -$close_tag.size-1
	return string.gsub(/#{$open_tag}.*?#{$close_tag}/) do |b|
		next %{";
	#{b[first..last]};
	_out+="}.gsub /\\\"/,"\""
	end
end

def puts_replace string
	first = $puts_tag.size
	last = -$close_tag.size-1
	return string.gsub(/#{$puts_tag}.*?#{$close_tag}/) do |b|
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
puts remove_special(surround_function($template_name,normal_replace(puts_replace(quotes_escape(raw_text)))))
