const formatDate = (date: number): string => {
  let value: string;
  switch (date) {
    case 1:
      value = `${date}st`;
      break;
      case 2:
      value = `${date}nd`;
      break;
    case 3:
      value = `${date}rd`;
      break;
    default:
      value = `${date}th`;
  }
  return value;
}

export default formatDate;