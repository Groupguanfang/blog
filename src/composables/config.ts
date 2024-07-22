import { load } from 'js-yaml'
import rawConfiguration from '../../config.yml?raw'

export function useConfiguration() {
  const configuration = (load(rawConfiguration) as Record<string, any>) || {}

  return {
    configuration,
    rawConfiguration,
  }
}
