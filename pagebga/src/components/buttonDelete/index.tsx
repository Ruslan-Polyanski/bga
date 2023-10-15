import { deletePodgroupTC } from '../../store';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

type Props = {
  uniqueId: string,
  index: number,
}

const ButtonDelete = ({uniqueId, index}: Props) => {

  const dispatch: Dispatch = useDispatch();

  const handleClick = () => {
    dispatch(deletePodgroupTC(uniqueId, index))
  }

  return (
    <button onClick={handleClick}>-</button>
  )
}

export { ButtonDelete }