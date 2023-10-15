import { Podgroups, recountTC } from '../../store';
import { useDispatch } from 'react-redux';
import { SelectBase } from '../select';
import style from './style.module.css';
import { setAllTeacherTC } from '../../store';

type Props = { 
  title: string, 
  data?: string, 
  field?: any,
  podgroups?: Podgroups[],
  uniqueId: string,
  numTD?: number,
  uniq?: string,
  teacher: string,
  isDisabled?: boolean,
};

const TR = ({ title, data, field, podgroups, uniqueId, numTD, uniq, teacher, isDisabled }: Props) => {

  const dispatch = useDispatch();

  const handleChange = (uniqueId: string, index: number, event: any) => {
    dispatch(recountTC(uniqueId, index, event.target.value))
  }

  const handleClick = (index: number) => {
    dispatch(setAllTeacherTC({uniqueId, index}))
  }

  if(podgroups && uniq === 'people') {
    return (
      <tr>
        <td>{title}</td>
        <td>{null}</td>
        {
          podgroups.map((item, index) => <td key={index}><input onChange={(event) => handleChange(uniqueId, index, event)} value={item.countStudents} /></td>)
        }
      </tr>
    )
  } 
  
  if (numTD === 2 && uniq === 'prim') {
    return (
      <tr>
        <td>{title}</td>
        <td>{data}</td>
        <td colSpan={2}>{field}</td>
        <td></td>
      </tr>
    )
  } 

  if (numTD === 1 && uniq === 'prim') {
    return (
      <tr>
        <td>{title}</td>
        <td>{data}</td>
        <td >{field}</td>
      </tr>
    )
  } 

  
if(podgroups && uniq !== 'people' && uniq !== 'prim') {
    if(isDisabled === true || isDisabled === false) {
      return (
          <tr>
          <td>{title}</td>
          <td>{data}</td>
          {podgroups.map((item, index) => <td key={index}>
                                            <div className={style.block}>
                                              <SelectBase uniqueId={uniqueId} 
                                                          podgroup={index}
                                                          categoryTeacher={teacher}
                                                          isDisabled={isDisabled} />
                                              {teacher === 'lectureTeacher' ? <button onClick={() => handleClick(index)}>+</button> : null}
                                            </div>
                                          </td>)}
        </tr>
      )
    }
  } 

  return null;
}

export { TR }