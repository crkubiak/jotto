import stringsModule from './strings'
const { getStringByLanguage } = stringsModule

const strings = {
  en: { submit: 'submit' },
  emoji: { submit: '🚀' },
  mermish: {}
}
describe('language string testing', () => {
  const mockWarn = jest.fn()
  let originWarn
  beforeEach(() => {
    console.warn = mockWarn
  })

  afterEach(() => {
    console.warn = originWarn
  })

  it('returns correct submit string for English', () => {
    const string = getStringByLanguage('en', 'submit', strings)
    expect(string).toBe('submit')
    expect(mockWarn).not.toHaveBeenCalled()
  })

  it('returns correct submit string for emoji', () => {
    const string = getStringByLanguage('emoji', 'submit', strings)
    expect(string).toBe('🚀')
    expect(mockWarn).not.toHaveBeenCalled()
  })

  it('returns English submit string when language does not exist', () => {
    const string = getStringByLanguage('notALanguage', 'submit', strings)
    expect(string).toBe('submit')
    expect(mockWarn).toHaveBeenCalledWith(
      'Could not get string [submit] for [notALanguage]'
    )
  })

  it('returns English submit string when submit key does not exist for language', () => {
    const string = getStringByLanguage('mermish', 'submit', strings)
    expect(string).toBe('submit')
    expect(mockWarn).toHaveBeenCalledWith(
      'Could not get string [submit] for [mermish]'
    )
  })
})
