import { useQuery } from 'react-query';
import { getKnowledgeAreas, getSubKnowledgeAreas } from '../services/KnowledgeArea';

const fetchKnowledgeAreas = async () => getKnowledgeAreas().then((res) => res.data);

export const useKnowledgeAreas = () => useQuery(['knowledge_areas'], () => fetchKnowledgeAreas());
// - - - - -
const fetchSubKnowledgeAreas = async (id) => getSubKnowledgeAreas(id).then((res) => res.data);

export const useSubKnowledgeAreas = (id) =>
  useQuery(['subKnowledge_areas', id], () => fetchSubKnowledgeAreas(id));

