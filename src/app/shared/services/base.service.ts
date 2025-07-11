export abstract class BaseService<T> {
  items: T[] = [];

  getAll(): T[] {
    return this.items;
  }

  getById(id: string): T | undefined {
    return this.items.find(item => (item as any).id === id);
  }

  add(item: T): void {
    this.items.push(item);
  }

  update(id: string, updated: Partial<T>): void {
    const item = this.getById(id);
    if (item) {
      Object.assign(item, updated);
    }
  }

  delete(id: string): void {
    this.items = this.items.filter(item => (item as any).id !== id);
  }
}
