import { useQuery } from 'react-query';
import { getStudent } from '../services/Student';

const fetchStudent = async (id) => getStudent(id).then((res) => res.data);

const useStudent = (id) => useQuery(['student', id], () => fetchStudent(id));

export default useStudent;
