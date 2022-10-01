import { useState } from "react";

export const useInput = (initialValue, options) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event) => {
    for (const option in options) {
      if (options.hasOwnProperty(option)) {
        let currentValue = event.target.value;
        if (options.trim) currentValue = currentValue.trim();
        switch (option) {
          case "onlyNumber":
            if (
              !options[option] ||
              (options[option] && !isNaN(Number(currentValue)))
            )
              setValue(currentValue);
            // Обновляем value только в том случае, если опция "onlyNumber" выключена,
            // либо она включена и текущее значение является number
            break;
          default:
            break;
        }
      }
    }
    // Проверку на числа можно было сделать куда проще, но
    // данный подход был выбран, т.к. потенциально этот хук можно расширить,
    // добавив новые кейсы для проверки, например, на проверку длины строки и т.д.
  };
  return {
    value,
    onChange,
    setValue,
  };
};
