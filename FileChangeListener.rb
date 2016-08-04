#!/usr/bin/env ruby
=begin
This script checks if there is a file change and call a given trigger

Use mode: ./FileChangeListener.rb [dir to watch] [cmd]
Example: ./FileChangeListener.rb assets "cordova prepare browser"
=end
$md5 = `tar -cf - ./#{ARGV[0]} | md5sum`
loop do
	$new_md5 = `tar -cf - ./#{ARGV[0]} | md5sum`
	if $new_md5!=$md5
		$md5 = $new_md5
		puts "change detected"
		print "#{ARGV[1]}: "
		puts `#{ARGV[1]}`
		puts "done!\n\n"
	end
	sleep 1
end
