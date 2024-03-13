if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]; then
  echo "Usage: $0 <filename> <source_file> <target_file>"
  exit 1
fi

# Assign the filename and keywords file to variables

filename="$1"
source_file="$2"
target_file="$3"


# Check if the source list of file exists

if [ "$source_file" = "HP-UX" ] && [ "$target_file" = "RHEL" ]; then
  rd="rhel_rules.txt"
elif [ "$source_file" = "Solaris" ] && [ "$target_file" = "RHEL" ]; then
  rd="solaris_rules.txt"
elif [ "$source_file" = "AIX" ] && [ "$target_file" = "RHEL" ]; then
  rd="AIX_rules.txt"
else
  # Default value for rd when the conditions are not met
  echo "No matching rd value for the provided parameters."
fi


# Read the keywords file into an array
mapfile -t keywords < "$rd"

output="final_report.csv"



for keyword in "${keywords[@]}"
do
#dj_var=$(grep -nrw "$keyword" "$filename" 2>/dev/null | grep -v -E '(#)' | grep --exclude="*.sql" || true)

dj_var=$(grep -nrw "$keyword" "$filename" 2>/dev/null || true)

if [  "$dj_var" ];then
        while IFS=':' read -r line_num line_content; do
	row=$(grep -w "^$keyword" rrem_matrix.csv)
        #echo "$line_num,$filename,$row,$line_content" >> "$output_file"
    	echo "$line_num,$line_content,$row" >> "$output"
	done <<< "$dj_var"
fi
done
