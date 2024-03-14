import { PlusIcon } from '../icons/PlusIcon';

export function PlusButton({onClick}:{onClick:() => void}) {
   return <PlusIcon style={{'width':'20px','height':'20px',cursor:'pointer'}} onClick={onClick}/>
}