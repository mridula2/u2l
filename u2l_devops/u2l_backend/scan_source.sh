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
  rd="hpux_rules.txt"
elif [ "$source_file" = "Solaris" ] && [ "$target_file" = "RHEL" ]; then
  rd="solaris_rules.txt"
elif [ "$source_file" = "AIX" ] && [ "$target_file" = "RHEL" ]; then
  rd="AIX_rules.txt"
else
  # Default value for rd when the conditions are not met
	echo "Provide the correct source/target details."
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
	if [ "$rd" = "hpux_rules.txt" ]; then
		row=$(grep -w "^$keyword" hpux_rem_matrix.csv)
	elif [ "$rd" = "solaris_rules.txt" ]; then
		row=$(grep -w "^$keyword" solaris_rem_matrix.csv)
	elif [ "$rd" = "AIX_rules.txt" ]; then
		row=$(grep -w "^$keyword" AIX_rem_matrix.csv)
	fi
	echo "$line_num,$line_content,$row" >> "$output"
	done <<< "$dj_var"
fi
done
sed -i "s/\r//g" final_report.csv 
