find "$1" -name "*.css" | xargs cat > "$2.css"
find "$1" -name "*.js" | xargs cat > "$2.js"
