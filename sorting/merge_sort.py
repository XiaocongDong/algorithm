from util.list import *


def merge_sort(l):
	if len(l) <= 1:
		return 

	start = 0
	end = len(l) - 1
	auxl = copy_list(l)

	_merge_sort(l, auxl, start, end)

def _merge_sort(l, auxl, start, end):
	if start == end:
		return

	middle = int((start + end)/2)

	# sort the left
	_merge_sort(l, auxl, start, middle)
	# sort the right
	_merge_sort(l, auxl, middle + 1, end)

	if(l[middle] <= l[middle + 1]):
		return

	_merge(l, auxl, start, middle, end)	

def _merge(l, auxl, start, middle, end):
	# k points to the start index of current merging sub list in the copy list 
	k = start
	# i points to the start index of the left sub list
	i = start
	# j points to the start index of the right sub list
	j = middle + 1

	while(i <= middle and j <= end):
		if l[i] > l[j]:
			auxl[k] = l[j]
			j += 1
		else:
			auxl[k] = l[i]
			i += 1
		k += 1

	if(i <= middle):
		for x in range(i, middle + 1):
			auxl[k] = l[x]
			k += 1

	if(j <= end):
		for x in range(j, end):
			auxl[k] = l[x]
			k += 1

	copy_from_list_to_list(auxl, l, start, end)

def _sub_insertion_sort(l, start, end):
	for i in range(start + 1, end + 1):
		copy = l[i]
		cur_p = i
		for j in range(i - 1, start - 1, -1):
			if copy < l[j]:
				l[cur_p] = l[j]
				cur_p = j
			else:
				break
		l[cur_p] = copy

# optimize 1, when the length of the sub list is less than a specific number, use insertion sort
# insertion sort is better when n is not big

# the previous merge sort is from top to bottom
# next one is to from bottom to top

def merge_from_bottom_up(l):
	# TODO 
	pass

if __name__ == '__main__':
	test_list = generate_random_list(1000000, 1, 10000)
	#_sub_insertion_sort(test_list, 0, 49)
	merge_sort(test_list)
	print_list(test_list)
