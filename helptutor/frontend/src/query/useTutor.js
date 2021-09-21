import { useQuery } from 'react-query';
import { getTutor } from '../services/Tutor';

const fetchTutor = async (id) => getTutor(id).then((res) => res.data);

const useTutor = (id) => useQuery(['tutor', id], () => fetchTutor(id));

export default useTutor;
