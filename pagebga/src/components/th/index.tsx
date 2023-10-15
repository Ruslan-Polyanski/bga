import { Podgroups } from '../../store';
import { ButtonAdd } from '../buttonAdd';
import { ButtonDelete } from '../buttonDelete';

type Props = {
  podgroups: Podgroups[],
  uniqueId: string
}

const TH = ({podgroups, uniqueId}: Props) => {

  return (
    <tr>
      <th>Занятие</th>
      <th>Часы</th>
      {
        podgroups.length === 1 
          ? <th>Преподаватель {<ButtonAdd uniqueId={uniqueId} />}</th> 
          : podgroups.map((item, index) => <th key={index}>Подгруппа {index + 1} {index > 0 
                                                                                  ? <ButtonDelete uniqueId={uniqueId} index={index}/> 
                                                                                  : null} </th>)
      }
    </tr>
  )
}

export { TH }