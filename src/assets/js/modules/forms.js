/**
 * Apply placeholder polyfill to form elements
 * @param {HTMLElement} form - The form element to process
 */
export function applyPlaceholderPolyfill(form) {
  // Check if native placeholder is supported
  if ('placeholder' in document.createElement('input')) return;

  const setupPlaceholder = (input) => {
    if (input.value === '' || input.value === input.getAttribute('placeholder')) {
      input.classList.add('polyfill-placeholder');
      input.value = input.getAttribute('placeholder');
    }
  };

  const handleBlur = (input) => {
    if (input.getAttribute('name')?.match(/-polyfill-field$/)) return;
    if (input.value === '') {
      input.classList.add('polyfill-placeholder');
      input.value = input.getAttribute('placeholder');
    }
  };

  const handleFocus = (input) => {
    if (input.getAttribute('name')?.match(/-polyfill-field$/)) return;
    if (input.value === input.getAttribute('placeholder')) {
      input.classList.remove('polyfill-placeholder');
      input.value = '';
    }
  };

  // Handle text inputs and textareas
  form.querySelectorAll('input[placeholder], textarea[placeholder]').forEach((input) => {
    setupPlaceholder(input);
    input.addEventListener('blur', () => handleBlur(input));
    input.addEventListener('focus', () => handleFocus(input));
  });

  // Special handling for password fields
  form.querySelectorAll('input[type=password]').forEach((input) => {
    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.value = input.getAttribute('placeholder');
    textInput.classList.add('polyfill-placeholder');

    // Copy relevant attributes
    if (input.id) textInput.id = input.id + '-polyfill-field';
    if (input.name) textInput.name = input.name + '-polyfill-field';

    textInput.addEventListener('focus', () => {
      textInput.style.display = 'none';
      input.style.display = '';
      input.focus();
    });

    input.addEventListener('blur', () => {
      if (input.value === '') {
        input.style.display = 'none';
        textInput.style.display = '';
      }
    });

    // Insert the text input after the password input
    input.parentNode.insertBefore(textInput, input.nextSibling);

    // Initial state
    if (input.value === '') {
      input.style.display = 'none';
    } else {
      textInput.style.display = 'none';
    }
  });

  // Form submission handling
  form.addEventListener('submit', () => {
    form.querySelectorAll('input[type=text], input[type=password], textarea').forEach((input) => {
      if (input.getAttribute('name')?.match(/-polyfill-field$/)) {
        input.setAttribute('name', '');
      }
      if (input.value === input.getAttribute('placeholder')) {
        input.classList.remove('polyfill-placeholder');
        input.value = '';
      }
    });
  });

  // Form reset handling
  form.addEventListener('reset', (e) => {
    e.preventDefault();

    form.querySelectorAll('select').forEach((select) => {
      select.selectedIndex = 0;
    });

    form.querySelectorAll('input, textarea').forEach((input) => {
      input.classList.remove('polyfill-placeholder');

      switch (input.type) {
        case 'submit':
        case 'reset':
          break;
        case 'password':
          input.value = input.getAttribute('defaultValue');
          if (input.value === '') {
            input.style.display = 'none';
            input.nextElementSibling.style.display = '';
          } else {
            input.style.display = '';
            input.nextElementSibling.style.display = 'none';
          }
          break;
        case 'checkbox':
        case 'radio':
          input.checked = input.getAttribute('defaultValue');
          break;
        case 'text':
        case 'textarea':
          input.value = input.getAttribute('defaultValue');
          if (input.value === '') {
            input.classList.add('polyfill-placeholder');
            input.value = input.getAttribute('placeholder');
          }
          break;
        default:
          input.value = input.getAttribute('defaultValue');
          break;
      }
    });
  });
}

/**
 * Prioritize elements within their parent
 * @param {NodeList|HTMLElement[]} elements - Elements to prioritize
 * @param {boolean} condition - Whether to move to top (true) or restore position (false)
 */
export function prioritizeElements(elements, condition) {
  elements = Array.from(elements);

  elements.forEach((element) => {
    const parent = element.parentNode;

    if (condition) {
      parent.prepend(element);
    } else {
      const position = element.dataset.priorityOriginalPosition;
      if (position !== undefined) {
        const siblings = Array.from(parent.children);
        const max = siblings.length;
        const index = Math.max(0, Math.min(max - 1, parseInt(position)));

        if (index === 0) {
          parent.prepend(element);
        } else {
          siblings[index - 1].after(element);
        }
      }
    }
  });
}
