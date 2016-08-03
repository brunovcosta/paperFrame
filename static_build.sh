#!/bin/bash
#Use:  ./static_build.sh [directory] [filename]
#Example: ./static_build.sh assets final
#   final.css   final.js
find "$1" -name "*.css" | xargs cat > "$2.css"
find "$1" -name "*.js" | xargs cat > "$2.js"
