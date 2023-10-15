import { DataItem } from '../../store';
import { TR } from '../tr';
import { TH } from '../th';

const Card = (props: DataItem) => {
  const { subjectName, groupName, course, studentsNumber, 
          lecturesHours, semestr, laboratoryHours, practicHours,
          seminarHours, offset, exam, podgroups, uniqueId } = props;
  return (
    <div>
      <div className="table-wrap">
        <table className='table-first'>
          <thead>
            <tr>
              <th colSpan={4}>{subjectName}</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Группа</td>
              <td>{groupName}</td>
              <td>Курс</td>
              <td>{course}</td>
            </tr>
            <tr>
              <td>Количество курсантов</td>
              <td>{studentsNumber}</td>
              <td>Семестр</td>
              <td>{semestr}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <TH podgroups={podgroups} uniqueId={uniqueId} />
          </thead>
          <tbody>
            <TR uniq='lecturesHours' teacher={'lectureTeacher'} podgroups={podgroups} uniqueId={uniqueId} title={'Лекции'} data={lecturesHours} isDisabled={lecturesHours === '0'} />
            <TR uniq='laboratoryHours' teacher={'laboratoryTeacher'} podgroups={podgroups} uniqueId={uniqueId} title={'Лабораторные работы'} data={laboratoryHours} isDisabled={laboratoryHours === '0'} />
            <TR uniq='practicHours' teacher={'practiceTeacher'} podgroups={podgroups} uniqueId={uniqueId} title={'Практические'} data={practicHours} isDisabled={practicHours === '0'} />
            <TR uniq='seminarHours' teacher={'seminarTeacher'} podgroups={podgroups} uniqueId={uniqueId} title={'Семинарские'} data={seminarHours} isDisabled={seminarHours === '0'} />
            {
              exam === true && offset === false ? <TR teacher={'examTeacher'} podgroups={podgroups} uniq='exam' uniqueId={uniqueId} title={'Экзамен'} data={''} isDisabled={false} /> : 
              exam === false && offset === true ? <TR teacher={'offsetTeacher'} podgroups={podgroups} uniq='offset' uniqueId={uniqueId} title={'Зачет'} data={''} isDisabled={false} /> :
              exam === false && offset === false ? null : null
            }
            {podgroups.length > 1 ? <TR teacher={'no'} uniq={'people'} title={'Количество человек'} podgroups={podgroups} uniqueId={uniqueId} /> : null }
            <TR teacher={'no'} uniq={'prim'} uniqueId={uniqueId} title={'Примечание (для составления расписания)'} data={''} field={<textarea />} numTD={podgroups.length} />
          </tbody>
        </table>
      </div>
    </div>
  )
};

export { Card }