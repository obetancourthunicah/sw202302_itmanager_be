import { MongoClient, MongoClientOptions, Db } from 'mongodb';

class MongoDBConnection {
  private static instance: MongoDBConnection;
  private client: MongoClient | undefined;
  private connectingPromise: Promise<MongoClient|void> | undefined;
  private mutex: Promise<void>;

  private constructor(private uri: string, private db: string) {
    this.mutex = Promise.resolve();
  }

  public static getInstance(uri: string, db: string): MongoDBConnection {
    if (!MongoDBConnection.instance) {
      MongoDBConnection.instance = new MongoDBConnection(uri, db);
    }
    return MongoDBConnection.instance;
  }

  public async connect(): Promise<Db> {
    if (!this.client && !this.connectingPromise) {
      this.connectingPromise = this.acquireMutex(async () => {
        try {
          this.client = await MongoClient.connect(this.uri);
          console.log('Connected to MongoDB');
        } catch (error) {
          console.error('Failed to connect to MongoDB:', error);
          throw error;
        }
      });
    }

    if (this.connectingPromise) {
      await this.connectingPromise;
    }

    return this.client!.db(this.db);
  }

  private async acquireMutex<T>(callback: () => Promise<T>): Promise<T> {
    await this.mutex;
    try {
      const result = await callback();
      return result;
    } finally {
      this.mutex = Promise.resolve();
    }
  }

  public async close(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = undefined;
      console.log('MongoDB connection closed');
    }
  }
}

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const db = process.env.MONGODB_DB || 'mydatabase';

const mongoDBConnection = MongoDBConnection.getInstance(uri, db);

export const getDb = async (): Promise<Db> => {
  const conn = await mongoDBConnection.connect();
  return conn;
};
