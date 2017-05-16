from util.list import *


def shell_sort(l):
	h = 1
	n = len(l)

	while h < n/3:
		h = 3 * h + 1

	# h will finally decrease to 1
	while h >= 1:
		for i in range(h):
			# normal insertion sort, the first number is always ordered, 
			# start from the second one
			j = i + h
			while j < n:
				insert_p = j
				copy = l[j]
				for k in range(j, i, -h):
					if copy < l[k - h]:
						l[k] = l[k - h]
						insert_p = k - h
					else:
						break
				l[insert_p] = copy
				j += h

		h = int(h/3)

if __name__ == '__main__':
	test_list = generate_random_list(3000, 1, 10000)
	h = shell_sort(test_list)
	print_list(test_list)