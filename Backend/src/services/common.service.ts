import { DataSource, EntityManager } from 'typeorm';

export class CommonService {
  entityManager: EntityManager;

  constructor(public dataSource: DataSource) {
    this.entityManager = dataSource.createEntityManager();
  }

  getDataSource(): DataSource {
    return this.dataSource;
  }
}
