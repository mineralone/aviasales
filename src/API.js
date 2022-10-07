export default class API {
  apiBase = 'https://front-test.dev.aviasales.ru'

  async getSearchId() {
    const response = await fetch(`${this.apiBase}/search`)
    if (!response.ok) throw new Error('Перезагрузите страницу!')
    const data = await response.json()
    return data
  }

  async getTickets(searchId) {
    const response = await fetch(`${this.apiBase}/tickets?searchId=${searchId}`)
    if (!response.ok) throw new Error('Возникли непредвиденные ошибки, мы уже исправляем это :)')
    const data = await response.json()
    return data
  }
}
