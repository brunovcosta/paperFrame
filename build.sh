#CSS
cat assets/stylesheets/*.css > www/style.css

#Javascript
cat assets/javascripts/vendor/*.js > www/vendor_code.js
tsc assets/javascripts/src/main.ts -out www/scr_code.js
find assets/templates/ -type f |xargs  ruby -e "puts ARGV.map{|b| \"#{b} Global.Templates #{b.gsub(/^.*templates\//,\"\").gsub(/\..*\$/,\"\")}\"}"| xargs -L 1 ./Parser.rb > www/template_code.js 
cat www/vendor_code.js www/scr_code.js www/template_code.js > www/code.js
rm www/vendor_code.js www/scr_code.js www/template_code.js
