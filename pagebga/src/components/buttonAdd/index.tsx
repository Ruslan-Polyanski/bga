import { addPodgroupTC } from '../../store';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

type Props = {
  uniqueId: string
}

const ButtonAdd = ({uniqueId}: Props) => {
  const dispatch: Dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addPodgroupTC(uniqueId))
  }

  return (
      <button onClick={handleClick}>+</button>
  )
}

export { ButtonAdd }

