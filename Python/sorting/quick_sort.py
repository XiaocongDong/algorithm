from util.list import *
import random

c = 0

def quick_sort(l):
	length = len(l)

	if not length:
		return

	start = 0
	end = length - 1

	_quick_sort(l, start, end)

def _quick_sort(l, start, end):
	if start >= end:
		return

	p = _partition(l, start, end)
	swap(l, start, p)
	_quick_sort(l, start, p - 1)
	_quick_sort(l, p + 1, end)
	

# return j, l[start...j] < l[start] and l[j + 1 ... end] > l[start]
def _partition(l, start, end):
	# p points to the pivot of this quick sort
	p = l[start]
	# j points to the last number that is less than pivot
	j = start

	for i in range(start + 1, end + 1, 1):
		if p > l[i]:
			swap(l, i, j + 1)
			j += 1

	return j

#### optimization ####

# when the list become nearly ordered, always picking the first
# element as the pivot will increase the time complexity of the algorithm
# to o(n^2), because n + (n - 1) + (n - 2) ...+ 1 
# optimization1 is randomly picked up the pivot

def _partition_opt1(l, start, end):
	# randomly pick up one position
	start_p = random.randint(start, end)
	# swap the start element and the selected element
	# so that the rest of the code can remain the same
	# as the normal one
	swap(l, start, start_p)
	p = l[start]
	j = start

	for i in range(start + 1, end + 1, 1):
		if p > l[i]:
			swap(l, i, j + 1)
			j += 1
	
	return j

def _quick_sort_opt1(l, start, end):
	if start >= end:
		return
	
	p = _partition_opt1(l, start, end)
	swap(l, start, end)
	_quick_sort_opt1(l, start, p - 1)
	_quick_sort_opt1(l, p + 1, end)

def quick_sort_opt1(l):
	if len(l) <= 1:
		return
	
	_quick_sort_opt1(l, 0, len(l) - 1)

# when the list has many identical elements, 
# after each iteration, the list may be split into 
# two unbalanced sublist, which also increase
# the running time of the quick sort, 
# the second optimization is to distribute
# the identical elements evenly to the sublist 
# after each iteration, so we can swap the elements
# even it is equal the pivot, here comes the second
# optimization way

def _quick_sort_opt2(l, start, end):
	# iteration ending condition
	if start >= end:
		return

	# still do the random picking
	start_p = random.randint(start, end)
	swap(l, start, start_p)

	p = l[start]

	# when the algorithm is running, we need to
	# make sure l[start + 1...i) <= v and l(j, end]
	i = start + 1 # so the begining, no elements in the first sub list
	j = end # no elements in the second sub list

	while True:
		# after the loop the i will point to the element which 
		# is larger or equal than p
		while i <= end and l[i] < p:
			i += 1
			
		# j points to the element that is less or equal than p
		while j > start and l[j] > p:
			j -= 1
		
		# check if the outer loop need to be ended
		if i >= j:
			break
		
		swap(l, i, j)
		i += 1
		j -= 1
	
	# at the end l[j] <= p
	# swap the position
	swap(l, start, j)
	_quick_sort_opt2(l, start, j - 1)
	_quick_sort_opt2(l, j + 1, end)

def quick_sort_opt2(l):
	if len(l) <= 1:
		return
	
	_quick_sort_opt2(l , 0, len(l) - 1)

# actually during each iteration, we can 
# gather all the identical elements together
# so that it will shorten elements which order
# id unknown

def quick_sort_three_way_partition(l):
	if len(l) <= 1:
		return

	_quick_sort_three_way_partition(l, 0, len(l) - 1)

def _quick_sort_three_way_partition(l, start, end):
	if start >= end:
		return
	
	start_p = random.randint(start, end)
	swap(l, start, start_p)

	p = l[start]
	# l[start...lt] < p and l[gt...end] > p make sure l[lt + 1, i) = p until i reaches gt
	lt = start
	gt = end + 1
	i = lt + 1

	while i < gt:
		if l[i] < p:
			swap(l, i, lt + 1)
			lt += 1
			i += 1
		elif l[i] > p:
			swap(l, i, gt - 1)
			gt -= 1
		else:
			i += 1
	
	swap(l, start, lt)
	_quick_sort_three_way_partition(l, start, lt - 1)
	_quick_sort_three_way_partition(l, gt, end)
	

test_list = generate_random_list(1000, 1, 10)
#print_list(test_list)
print()
#quick_sort(test_list)
quick_sort_three_way_partition(test_list)
print_list(test_list)

