import { Link } from 'react-router-dom';

export function BottomWarning(props){
  return(
    <div className="flex flex-col md:flex-row items-center mb-2 mt-2 text-center pl-5">
      <p className="mr-1">{props.label}</p>
      <Link className="underline" to={props.to}>{props.buttontext}</Link>
    </div>
  );
}
