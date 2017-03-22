export default function cleanupName(name){
  name = String(name || '');
  /* eslint-disable */
  name = name.replace(/\&amp\;/g, '&')
              .replace(/\&apos\;/g, '\'')
              .replace(/\%28\;/g, '(')
              .replace(/\%29\;/g, ')'); //WTF!!! burn in hell, XML

  return name;
}
