export function Inputs(props) {
    return (
      <>
        <div className="font-medium mb-1">
          {props.label}
        </div>
        <div>
          <input
            onChange={props.onChange}
            className="w-full mt-1 p-2 mb-3 border border-neutral-400 rounded"
            placeholder={props.placeholder}
            type={props.type}
            required
          />
        </div>
      </>
    );
  }
  