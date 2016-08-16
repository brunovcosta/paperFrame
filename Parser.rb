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
		next %{");
	#{b[first..last]};
	_out.push("}.gsub /\\\"/,"\""
	end
end

def puts_replace string
	first = $puts_tag.size
	last = -$close_tag.size-1
	return string.gsub(/#{$puts_tag}.*?#{$close_tag}/) do |b|
		next %{");
	_out.push(#{b[first..last]});
	_out.push("}.gsub /\\\"/,"\""
	end
end

def surround_function template_name,string
	return %{
#{$template_object}["#{template_name}"]=function(scope){
	with(scope||{}){
		var _out = [];
		_out.push("#{string}");
		return _out.join("");
	}
};}
end

def remove_special string
	return string.gsub(/\\/,'\\').gsub(/\"/,'\"').gsub(/\n/,'\n').gsub(/\t/,'\t').gsub(/\n/,'\n')
end
puts surround_function($template_name,normal_replace(puts_replace(remove_special(raw_text))))
