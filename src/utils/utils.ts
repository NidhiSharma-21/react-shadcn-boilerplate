/**
 * A utility function to merge Tailwind CSS classes
 * @param inputs - Class names to merge
 * @returns string - Merged class names
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

type ClassValue = string | number | boolean | null | undefined | ClassDictionary | ClassArray

interface ClassDictionary {
  [id: string]: boolean | null | undefined
}

interface ClassArray extends Array<ClassValue> {}

// clsx implementation (simplified)
function clsx(...args: ClassValue[]): string {
  let i = 0
  let str = ''
  let tmp: any
  let len = args.length

  while (i < len) {
    tmp = args[i++]
    if (tmp) {
      if (typeof tmp === 'string') {
        str += (str && ' ') + tmp
      } else if (typeof tmp === 'object') {
        if (Array.isArray(tmp)) {
          str += (str && ' ') + clsx(...tmp)
        } else {
          for (const key in tmp) {
            if (tmp[key]) {
              str += (str && ' ') + key
            }
          }
        }
      }
    }
  }
  return str
}

// tailwind-merge implementation (simplified)
function twMerge(classList: string): string {
  if (!classList) return ''

  const classes = classList.split(' ')
  // ...rest of the implementation...
  return Array.from(new Set(classes)).join(' ')
}
