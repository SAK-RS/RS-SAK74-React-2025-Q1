export const split = (el: object | string | number) => {
  if (typeof el === 'string' || typeof el === 'number') {
    return el;
  } else if (Array.isArray(el)) {
    return el.join(', ');
  } else {
    return (
      <ul className="list-disc list-inside ms-4">
        {Object.entries(el).map(([key, value]) => (
          <li key={key} className="">
            <span className="font-bold">{key}: </span>
            <span>{split(value)}</span>
          </li>
        ))}
      </ul>
    );
  }
};
