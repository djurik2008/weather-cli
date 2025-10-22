export const getArgs = (args) => {
  const res = {};
  const [, , ...rest] = args;

  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i];
    if (arg.startsWith("-")) {
      const next = rest[i + 1];
      if (next && !next.startsWith("-")) {
        res[arg.substring(1)] = next;
        i++;
      } else {
        res[arg.substring(1)] = true;
      }
    }
  }

  return res;
};
