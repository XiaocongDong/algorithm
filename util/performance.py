from datetime import datetime
from util.list import *

def test_sort(sort_name, sort_func, test_list):
	start_time = datetime.now()

	sort_func(test_list)

	end_time = datetime.now()

	executed_s = (end_time - start_time).seconds

	if not is_sorted(test_list):
		print('{0} sorted failed'.format(sort_name))
		return 

	print('{0} needs {1}s to sort {2} numbers'.format(sort_name, executed_s, len(test_list)))