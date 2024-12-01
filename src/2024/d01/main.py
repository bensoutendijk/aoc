import os

# Get the directory of the current script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the full path to input.txt
file_path = os.path.join(script_dir, 'input.txt')

# Open and read the file
with open(file_path, 'r') as file:
    list1 = []
    list2 = []
    
    for line in file:
        [lhs, rhs] = line.strip().split("   ")
        list1.append(int(lhs))
        list2.append(int(rhs))
    
    list1.sort()
    list2.sort()
    
    total_distance = 0
    for i in range(list1.__len__()):
        lhs = list1[i]
        rhs = list2[i]
        distance = abs(lhs - rhs)
        total_distance += distance
        
    print("distance", total_distance)

# part 2
with open(file_path, 'r') as file:
    list1 = []
    list2 = []
    
    for line in file:
        [lhs, rhs] = line.strip().split("   ")
        list1.append(int(lhs))
        list2.append(int(rhs))
    
    list1.sort()
    list2.sort()
    
    similarity_score = 0
    for i in range(list1.__len__()):
        lhs = list1[i]
        count = list2.count(lhs)
        similarity_score += lhs * count
        
    print("similarity score", similarity_score)