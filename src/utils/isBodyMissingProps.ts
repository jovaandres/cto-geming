export function isBodyMissingProps(requiredProps: any = [], body: any) {
  let hasMissingProps = false;

  // @ts-ignore
  const propErrors = requiredProps.reduce((errors, [prop, errorMessage, noEmptyStrings = false]) => {
    if (body[prop] === undefined || typeof body[prop] === "undefined" || (noEmptyStrings && !body[prop])) {
      hasMissingProps = true;
      // @ts-ignore
      errors[prop] = {message: errorMessage || `${prop} is required`};
    }
    return errors;
  }, {});

  return {
    hasMissingProps,
    propErrors
  };
}
