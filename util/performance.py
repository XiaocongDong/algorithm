from datetime import datetime
from util.list import *

from sorting import selection_sort, shell_sort, insertion_sort

def test_sort(sort_name, sort_func, test_list):
	start_time = datetime.now()

	sort_func(test_list)

	end_time = datetime.now()

	executed_s = (end_time - start_time).seconds

	if not is_sorted(test_list):
		print('{0} sorted failed'.format(sort_name))
		return 

	print('{0} needs {1}s to sort {2} numbers'.format(sort_name, executed_s, len(test_list)))

def sort_performance(n):
	test_list = generate_random_list(n, 1, n)
	test_list2 = copy_list(test_list)
	test_list3 = copy_list(test_list)

	test_sort('selection_sort', selection_sort.selection_sort, test_list)
	test_sort('insertion-sort', insertion_sort.insertion_sort, test_list2)
	test_sort('shell-sort', shell_sort.shell_sort, test_list3)

if __name__ == '__main__':
	sort_performance(1000)