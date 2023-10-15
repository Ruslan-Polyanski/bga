import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { RootState, Teacher, setTeacherTC, AppDispatch } from '../../store';
import { useSelector, useDispatch } from 'react-redux';

type Props = {
  uniqueId: string,
  podgroup: number,
  categoryTeacher: string,
  isDisabled: boolean,
}

const teachersSelector = (store: RootState) => store.teachers;
const teachersDataSelector = (store: RootState) => store.data;

const SelectBase = ({uniqueId, podgroup, categoryTeacher, isDisabled}: Props) => {

  const dispatch: AppDispatch = useDispatch();

  const teachers: Teacher[] = useSelector(teachersSelector);

  const teachersData: [] = useSelector(teachersDataSelector);
  const podgroupData: {podgroups: []} = teachersData.filter((item: any) => item.uniqueId === uniqueId)[0];
  const objDataTeacher: any = podgroupData.podgroups[podgroup];
  const id = objDataTeacher[categoryTeacher];

  const handleChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null,
  ) => {
    const data = {
      uniqueId,
      podgroup, 
      categoryTeacher, 
      idTeacher: newValue
    }

    dispatch(setTeacherTC(data))
  };


  return (
    <Select sx={{ width: '100%' }} defaultValue={id ? id : "vacancy"} value={id ? id : "vacancy"} disabled={isDisabled} onChange={handleChange}>
      <Option value="vacancy">Вакансия</Option>
      {teachers.map(teacher => <Option key={teacher.id} value={teacher.id}>{teacher.name}</Option>)}
    </Select>
  );
}

export { SelectBase }