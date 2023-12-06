import sys
import string

heights = list("S" + string.ascii_lowercase + "E")
map = {}
start = ()
end = ()

y = 0
for line in sys.stdin:
    y += 1
    x = 0
    for char in line:
        x += 1
        map[(x, y)] = char

        if char == "S":
            start = (x, y)
        elif char == "E":
            end = (x, y)

def path(start, end, map):
    node = start

    path = {}
    visited_nodes = {}

    def can_move(node, next_node):
        return map.get(next_node) is not None \
            and not visited_nodes.get(next_node)\
            and abs(heights.index(map.get(node)) - heights.index(map.get(next_node))) <= 1

    def move(node, next_node, map):
        visited_nodes[next_node] = map.get(next_node)
        return next_node

    while node != end:
        path[node] = map.get(node)
        (x , y) = node
        (endX, endY) = end
        x_delta = endX - x
        y_delta = endY - y


        up = (x, y + 1)
        right = (x + 1, y)
        down = (x, y - 1)
        left = (x - 1, y)

        if abs(x_delta) > abs(y_delta):
            if (x_delta > 0 and can_move(node, right)):
                print("moving right")
                node = move(node, right, map)
            elif (can_move(node, left)):
                print("moving left")
                node = move(node, left, map)
        else:
            if (y_delta > 0 and can_move(node, up)):
                print("moving up")
                node = move(node, up, map)
            elif (can_move(node, down)):
                print("moving down")
                node = move(node, down, map)

        print(node)
    
    return path

print(path(start, end, map))
print("SUCCESS")