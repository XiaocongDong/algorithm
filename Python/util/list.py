import random
import copy

def swap(l, i1, i2):
	if i1 == i2:
		return
		
	l[i1], l[i2] = l[i2], l[i1]

def generate_random_list(n, start, stop):
	r_list = []
	for i in range(n):
		r_list.append(random.randint(start, stop))

	return r_list

def generate_nearly_ordered_list(n, swap_times):
	n_ordered_list = [];
	for i in range(n):
		n_ordered_list.append(i)

	for i in range(swap_times):
		i1 = int(random.random() * n);
		i2 = int(random.random() * n);
		swap(n_ordered_list, i1, i2)

	return n_ordered_list

def is_sorted(l):
	for i in range(len(l) - 1):
		if l[i] > l[i + 1]:
			return False

	return True

def print_list(l):
	for e in l:
		print(e, ' ')

def copy_list(l):
	return copy.deepcopy(l)

def copy_from_list_to_list(fl, tl,start, end):
	for x in range(start, end + 1):
		tl[x] = fl[x]
