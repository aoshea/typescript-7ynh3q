const DICT_ALT_12_URL =
  'https://raw.githubusercontent.com/en-wl/wordlist/master/alt12dicts/2of4brif.txt';

export function requestDict(
  onSuccess = onSuccessDefault,
  url = DICT_ALT_12_URL
) {
  fetch(url)
    .then((res) => res.text())
    .then((res) => {
      onSuccess(res);
    })
    .catch((err) => console.error(err));
}

function onSuccessDefault(res) {
  console.log('what?', res);
}
