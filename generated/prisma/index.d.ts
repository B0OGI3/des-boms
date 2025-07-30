
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model PurchaseOrder
 * 
 */
export type PurchaseOrder = $Result.DefaultSelection<Prisma.$PurchaseOrderPayload>
/**
 * Model OrderLineItem
 * 
 */
export type OrderLineItem = $Result.DefaultSelection<Prisma.$OrderLineItemPayload>
/**
 * Model FileAttachment
 * 
 */
export type FileAttachment = $Result.DefaultSelection<Prisma.$FileAttachmentPayload>
/**
 * Model Batch
 * 
 */
export type Batch = $Result.DefaultSelection<Prisma.$BatchPayload>
/**
 * Model RoutingStep
 * 
 */
export type RoutingStep = $Result.DefaultSelection<Prisma.$RoutingStepPayload>
/**
 * Model Workstation
 * 
 */
export type Workstation = $Result.DefaultSelection<Prisma.$WorkstationPayload>
/**
 * Model StepConfirmation
 * 
 */
export type StepConfirmation = $Result.DefaultSelection<Prisma.$StepConfirmationPayload>
/**
 * Model QCRecord
 * 
 */
export type QCRecord = $Result.DefaultSelection<Prisma.$QCRecordPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const OrderPriority: {
  RUSH: 'RUSH',
  STANDARD: 'STANDARD',
  HOLD: 'HOLD'
};

export type OrderPriority = (typeof OrderPriority)[keyof typeof OrderPriority]


export const BatchPriority: {
  RUSH: 'RUSH',
  STANDARD: 'STANDARD',
  HOLD: 'HOLD'
};

export type BatchPriority = (typeof BatchPriority)[keyof typeof BatchPriority]


export const BatchStatus: {
  QUEUED: 'QUEUED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  ON_HOLD: 'ON_HOLD',
  CANCELLED: 'CANCELLED'
};

export type BatchStatus = (typeof BatchStatus)[keyof typeof BatchStatus]


export const StepStatus: {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  SKIPPED: 'SKIPPED',
  FAILED: 'FAILED'
};

export type StepStatus = (typeof StepStatus)[keyof typeof StepStatus]


export const ConfirmationStatus: {
  STARTED: 'STARTED',
  COMPLETED: 'COMPLETED',
  PAUSED: 'PAUSED',
  FLAGGED: 'FLAGGED'
};

export type ConfirmationStatus = (typeof ConfirmationStatus)[keyof typeof ConfirmationStatus]


export const SyncStatus: {
  PENDING: 'PENDING',
  SYNCED: 'SYNCED',
  FAILED: 'FAILED',
  UPDATING: 'UPDATING'
};

export type SyncStatus = (typeof SyncStatus)[keyof typeof SyncStatus]


export const QCResult: {
  PASS: 'PASS',
  FAIL: 'FAIL',
  REWORK_REQUIRED: 'REWORK_REQUIRED'
};

export type QCResult = (typeof QCResult)[keyof typeof QCResult]

}

export type OrderPriority = $Enums.OrderPriority

export const OrderPriority: typeof $Enums.OrderPriority

export type BatchPriority = $Enums.BatchPriority

export const BatchPriority: typeof $Enums.BatchPriority

export type BatchStatus = $Enums.BatchStatus

export const BatchStatus: typeof $Enums.BatchStatus

export type StepStatus = $Enums.StepStatus

export const StepStatus: typeof $Enums.StepStatus

export type ConfirmationStatus = $Enums.ConfirmationStatus

export const ConfirmationStatus: typeof $Enums.ConfirmationStatus

export type SyncStatus = $Enums.SyncStatus

export const SyncStatus: typeof $Enums.SyncStatus

export type QCResult = $Enums.QCResult

export const QCResult: typeof $Enums.QCResult

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Customers
 * const customers = await prisma.customer.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Customers
   * const customers = await prisma.customer.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.purchaseOrder`: Exposes CRUD operations for the **PurchaseOrder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PurchaseOrders
    * const purchaseOrders = await prisma.purchaseOrder.findMany()
    * ```
    */
  get purchaseOrder(): Prisma.PurchaseOrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderLineItem`: Exposes CRUD operations for the **OrderLineItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderLineItems
    * const orderLineItems = await prisma.orderLineItem.findMany()
    * ```
    */
  get orderLineItem(): Prisma.OrderLineItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fileAttachment`: Exposes CRUD operations for the **FileAttachment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FileAttachments
    * const fileAttachments = await prisma.fileAttachment.findMany()
    * ```
    */
  get fileAttachment(): Prisma.FileAttachmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.batch`: Exposes CRUD operations for the **Batch** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Batches
    * const batches = await prisma.batch.findMany()
    * ```
    */
  get batch(): Prisma.BatchDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.routingStep`: Exposes CRUD operations for the **RoutingStep** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoutingSteps
    * const routingSteps = await prisma.routingStep.findMany()
    * ```
    */
  get routingStep(): Prisma.RoutingStepDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workstation`: Exposes CRUD operations for the **Workstation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Workstations
    * const workstations = await prisma.workstation.findMany()
    * ```
    */
  get workstation(): Prisma.WorkstationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stepConfirmation`: Exposes CRUD operations for the **StepConfirmation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StepConfirmations
    * const stepConfirmations = await prisma.stepConfirmation.findMany()
    * ```
    */
  get stepConfirmation(): Prisma.StepConfirmationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.qCRecord`: Exposes CRUD operations for the **QCRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QCRecords
    * const qCRecords = await prisma.qCRecord.findMany()
    * ```
    */
  get qCRecord(): Prisma.QCRecordDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.12.0
   * Query Engine version: 8047c96bbd92db98a2abc7c9323ce77c02c89dbc
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Customer: 'Customer',
    PurchaseOrder: 'PurchaseOrder',
    OrderLineItem: 'OrderLineItem',
    FileAttachment: 'FileAttachment',
    Batch: 'Batch',
    RoutingStep: 'RoutingStep',
    Workstation: 'Workstation',
    StepConfirmation: 'StepConfirmation',
    QCRecord: 'QCRecord'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "customer" | "purchaseOrder" | "orderLineItem" | "fileAttachment" | "batch" | "routingStep" | "workstation" | "stepConfirmation" | "qCRecord"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      PurchaseOrder: {
        payload: Prisma.$PurchaseOrderPayload<ExtArgs>
        fields: Prisma.PurchaseOrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PurchaseOrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PurchaseOrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>
          }
          findFirst: {
            args: Prisma.PurchaseOrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PurchaseOrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>
          }
          findMany: {
            args: Prisma.PurchaseOrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>[]
          }
          create: {
            args: Prisma.PurchaseOrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>
          }
          createMany: {
            args: Prisma.PurchaseOrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PurchaseOrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>[]
          }
          delete: {
            args: Prisma.PurchaseOrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>
          }
          update: {
            args: Prisma.PurchaseOrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>
          }
          deleteMany: {
            args: Prisma.PurchaseOrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PurchaseOrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PurchaseOrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>[]
          }
          upsert: {
            args: Prisma.PurchaseOrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>
          }
          aggregate: {
            args: Prisma.PurchaseOrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePurchaseOrder>
          }
          groupBy: {
            args: Prisma.PurchaseOrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<PurchaseOrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.PurchaseOrderCountArgs<ExtArgs>
            result: $Utils.Optional<PurchaseOrderCountAggregateOutputType> | number
          }
        }
      }
      OrderLineItem: {
        payload: Prisma.$OrderLineItemPayload<ExtArgs>
        fields: Prisma.OrderLineItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderLineItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderLineItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderLineItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderLineItemPayload>
          }
          findFirst: {
            args: Prisma.OrderLineItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderLineItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderLineItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderLineItemPayload>
          }
          findMany: {
            args: Prisma.OrderLineItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderLineItemPayload>[]
          }
          create: {
            args: Prisma.OrderLineItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderLineItemPayload>
          }
          createMany: {
            args: Prisma.OrderLineItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderLineItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderLineItemPayload>[]
          }
          delete: {
            args: Prisma.OrderLineItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderLineItemPayload>
          }
          update: {
            args: Prisma.OrderLineItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderLineItemPayload>
          }
          deleteMany: {
            args: Prisma.OrderLineItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderLineItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderLineItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderLineItemPayload>[]
          }
          upsert: {
            args: Prisma.OrderLineItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderLineItemPayload>
          }
          aggregate: {
            args: Prisma.OrderLineItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderLineItem>
          }
          groupBy: {
            args: Prisma.OrderLineItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderLineItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderLineItemCountArgs<ExtArgs>
            result: $Utils.Optional<OrderLineItemCountAggregateOutputType> | number
          }
        }
      }
      FileAttachment: {
        payload: Prisma.$FileAttachmentPayload<ExtArgs>
        fields: Prisma.FileAttachmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FileAttachmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileAttachmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FileAttachmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileAttachmentPayload>
          }
          findFirst: {
            args: Prisma.FileAttachmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileAttachmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FileAttachmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileAttachmentPayload>
          }
          findMany: {
            args: Prisma.FileAttachmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileAttachmentPayload>[]
          }
          create: {
            args: Prisma.FileAttachmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileAttachmentPayload>
          }
          createMany: {
            args: Prisma.FileAttachmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FileAttachmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileAttachmentPayload>[]
          }
          delete: {
            args: Prisma.FileAttachmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileAttachmentPayload>
          }
          update: {
            args: Prisma.FileAttachmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileAttachmentPayload>
          }
          deleteMany: {
            args: Prisma.FileAttachmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FileAttachmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FileAttachmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileAttachmentPayload>[]
          }
          upsert: {
            args: Prisma.FileAttachmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileAttachmentPayload>
          }
          aggregate: {
            args: Prisma.FileAttachmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFileAttachment>
          }
          groupBy: {
            args: Prisma.FileAttachmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<FileAttachmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.FileAttachmentCountArgs<ExtArgs>
            result: $Utils.Optional<FileAttachmentCountAggregateOutputType> | number
          }
        }
      }
      Batch: {
        payload: Prisma.$BatchPayload<ExtArgs>
        fields: Prisma.BatchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BatchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BatchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          findFirst: {
            args: Prisma.BatchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BatchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          findMany: {
            args: Prisma.BatchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>[]
          }
          create: {
            args: Prisma.BatchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          createMany: {
            args: Prisma.BatchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BatchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>[]
          }
          delete: {
            args: Prisma.BatchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          update: {
            args: Prisma.BatchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          deleteMany: {
            args: Prisma.BatchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BatchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BatchUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>[]
          }
          upsert: {
            args: Prisma.BatchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          aggregate: {
            args: Prisma.BatchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBatch>
          }
          groupBy: {
            args: Prisma.BatchGroupByArgs<ExtArgs>
            result: $Utils.Optional<BatchGroupByOutputType>[]
          }
          count: {
            args: Prisma.BatchCountArgs<ExtArgs>
            result: $Utils.Optional<BatchCountAggregateOutputType> | number
          }
        }
      }
      RoutingStep: {
        payload: Prisma.$RoutingStepPayload<ExtArgs>
        fields: Prisma.RoutingStepFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoutingStepFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingStepPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoutingStepFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingStepPayload>
          }
          findFirst: {
            args: Prisma.RoutingStepFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingStepPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoutingStepFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingStepPayload>
          }
          findMany: {
            args: Prisma.RoutingStepFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingStepPayload>[]
          }
          create: {
            args: Prisma.RoutingStepCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingStepPayload>
          }
          createMany: {
            args: Prisma.RoutingStepCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoutingStepCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingStepPayload>[]
          }
          delete: {
            args: Prisma.RoutingStepDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingStepPayload>
          }
          update: {
            args: Prisma.RoutingStepUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingStepPayload>
          }
          deleteMany: {
            args: Prisma.RoutingStepDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoutingStepUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoutingStepUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingStepPayload>[]
          }
          upsert: {
            args: Prisma.RoutingStepUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingStepPayload>
          }
          aggregate: {
            args: Prisma.RoutingStepAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoutingStep>
          }
          groupBy: {
            args: Prisma.RoutingStepGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoutingStepGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoutingStepCountArgs<ExtArgs>
            result: $Utils.Optional<RoutingStepCountAggregateOutputType> | number
          }
        }
      }
      Workstation: {
        payload: Prisma.$WorkstationPayload<ExtArgs>
        fields: Prisma.WorkstationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkstationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkstationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkstationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkstationPayload>
          }
          findFirst: {
            args: Prisma.WorkstationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkstationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkstationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkstationPayload>
          }
          findMany: {
            args: Prisma.WorkstationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkstationPayload>[]
          }
          create: {
            args: Prisma.WorkstationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkstationPayload>
          }
          createMany: {
            args: Prisma.WorkstationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkstationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkstationPayload>[]
          }
          delete: {
            args: Prisma.WorkstationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkstationPayload>
          }
          update: {
            args: Prisma.WorkstationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkstationPayload>
          }
          deleteMany: {
            args: Prisma.WorkstationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkstationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkstationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkstationPayload>[]
          }
          upsert: {
            args: Prisma.WorkstationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkstationPayload>
          }
          aggregate: {
            args: Prisma.WorkstationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkstation>
          }
          groupBy: {
            args: Prisma.WorkstationGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkstationGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkstationCountArgs<ExtArgs>
            result: $Utils.Optional<WorkstationCountAggregateOutputType> | number
          }
        }
      }
      StepConfirmation: {
        payload: Prisma.$StepConfirmationPayload<ExtArgs>
        fields: Prisma.StepConfirmationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StepConfirmationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepConfirmationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StepConfirmationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepConfirmationPayload>
          }
          findFirst: {
            args: Prisma.StepConfirmationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepConfirmationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StepConfirmationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepConfirmationPayload>
          }
          findMany: {
            args: Prisma.StepConfirmationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepConfirmationPayload>[]
          }
          create: {
            args: Prisma.StepConfirmationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepConfirmationPayload>
          }
          createMany: {
            args: Prisma.StepConfirmationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StepConfirmationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepConfirmationPayload>[]
          }
          delete: {
            args: Prisma.StepConfirmationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepConfirmationPayload>
          }
          update: {
            args: Prisma.StepConfirmationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepConfirmationPayload>
          }
          deleteMany: {
            args: Prisma.StepConfirmationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StepConfirmationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StepConfirmationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepConfirmationPayload>[]
          }
          upsert: {
            args: Prisma.StepConfirmationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepConfirmationPayload>
          }
          aggregate: {
            args: Prisma.StepConfirmationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStepConfirmation>
          }
          groupBy: {
            args: Prisma.StepConfirmationGroupByArgs<ExtArgs>
            result: $Utils.Optional<StepConfirmationGroupByOutputType>[]
          }
          count: {
            args: Prisma.StepConfirmationCountArgs<ExtArgs>
            result: $Utils.Optional<StepConfirmationCountAggregateOutputType> | number
          }
        }
      }
      QCRecord: {
        payload: Prisma.$QCRecordPayload<ExtArgs>
        fields: Prisma.QCRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QCRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QCRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QCRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QCRecordPayload>
          }
          findFirst: {
            args: Prisma.QCRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QCRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QCRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QCRecordPayload>
          }
          findMany: {
            args: Prisma.QCRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QCRecordPayload>[]
          }
          create: {
            args: Prisma.QCRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QCRecordPayload>
          }
          createMany: {
            args: Prisma.QCRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QCRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QCRecordPayload>[]
          }
          delete: {
            args: Prisma.QCRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QCRecordPayload>
          }
          update: {
            args: Prisma.QCRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QCRecordPayload>
          }
          deleteMany: {
            args: Prisma.QCRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QCRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QCRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QCRecordPayload>[]
          }
          upsert: {
            args: Prisma.QCRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QCRecordPayload>
          }
          aggregate: {
            args: Prisma.QCRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQCRecord>
          }
          groupBy: {
            args: Prisma.QCRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<QCRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.QCRecordCountArgs<ExtArgs>
            result: $Utils.Optional<QCRecordCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    customer?: CustomerOmit
    purchaseOrder?: PurchaseOrderOmit
    orderLineItem?: OrderLineItemOmit
    fileAttachment?: FileAttachmentOmit
    batch?: BatchOmit
    routingStep?: RoutingStepOmit
    workstation?: WorkstationOmit
    stepConfirmation?: StepConfirmationOmit
    qCRecord?: QCRecordOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CustomerCountOutputType
   */

  export type CustomerCountOutputType = {
    purchaseOrders: number
  }

  export type CustomerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    purchaseOrders?: boolean | CustomerCountOutputTypeCountPurchaseOrdersArgs
  }

  // Custom InputTypes
  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerCountOutputType
     */
    select?: CustomerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountPurchaseOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PurchaseOrderWhereInput
  }


  /**
   * Count Type PurchaseOrderCountOutputType
   */

  export type PurchaseOrderCountOutputType = {
    lineItems: number
  }

  export type PurchaseOrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lineItems?: boolean | PurchaseOrderCountOutputTypeCountLineItemsArgs
  }

  // Custom InputTypes
  /**
   * PurchaseOrderCountOutputType without action
   */
  export type PurchaseOrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrderCountOutputType
     */
    select?: PurchaseOrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PurchaseOrderCountOutputType without action
   */
  export type PurchaseOrderCountOutputTypeCountLineItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderLineItemWhereInput
  }


  /**
   * Count Type OrderLineItemCountOutputType
   */

  export type OrderLineItemCountOutputType = {
    fileAttachments: number
    batches: number
  }

  export type OrderLineItemCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fileAttachments?: boolean | OrderLineItemCountOutputTypeCountFileAttachmentsArgs
    batches?: boolean | OrderLineItemCountOutputTypeCountBatchesArgs
  }

  // Custom InputTypes
  /**
   * OrderLineItemCountOutputType without action
   */
  export type OrderLineItemCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderLineItemCountOutputType
     */
    select?: OrderLineItemCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderLineItemCountOutputType without action
   */
  export type OrderLineItemCountOutputTypeCountFileAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FileAttachmentWhereInput
  }

  /**
   * OrderLineItemCountOutputType without action
   */
  export type OrderLineItemCountOutputTypeCountBatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BatchWhereInput
  }


  /**
   * Count Type BatchCountOutputType
   */

  export type BatchCountOutputType = {
    routingSteps: number
    qcRecords: number
  }

  export type BatchCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    routingSteps?: boolean | BatchCountOutputTypeCountRoutingStepsArgs
    qcRecords?: boolean | BatchCountOutputTypeCountQcRecordsArgs
  }

  // Custom InputTypes
  /**
   * BatchCountOutputType without action
   */
  export type BatchCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchCountOutputType
     */
    select?: BatchCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BatchCountOutputType without action
   */
  export type BatchCountOutputTypeCountRoutingStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoutingStepWhereInput
  }

  /**
   * BatchCountOutputType without action
   */
  export type BatchCountOutputTypeCountQcRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QCRecordWhereInput
  }


  /**
   * Count Type RoutingStepCountOutputType
   */

  export type RoutingStepCountOutputType = {
    confirmations: number
  }

  export type RoutingStepCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    confirmations?: boolean | RoutingStepCountOutputTypeCountConfirmationsArgs
  }

  // Custom InputTypes
  /**
   * RoutingStepCountOutputType without action
   */
  export type RoutingStepCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingStepCountOutputType
     */
    select?: RoutingStepCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoutingStepCountOutputType without action
   */
  export type RoutingStepCountOutputTypeCountConfirmationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StepConfirmationWhereInput
  }


  /**
   * Count Type WorkstationCountOutputType
   */

  export type WorkstationCountOutputType = {
    routingSteps: number
    confirmations: number
  }

  export type WorkstationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    routingSteps?: boolean | WorkstationCountOutputTypeCountRoutingStepsArgs
    confirmations?: boolean | WorkstationCountOutputTypeCountConfirmationsArgs
  }

  // Custom InputTypes
  /**
   * WorkstationCountOutputType without action
   */
  export type WorkstationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkstationCountOutputType
     */
    select?: WorkstationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WorkstationCountOutputType without action
   */
  export type WorkstationCountOutputTypeCountRoutingStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoutingStepWhereInput
  }

  /**
   * WorkstationCountOutputType without action
   */
  export type WorkstationCountOutputTypeCountConfirmationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StepConfirmationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerMinAggregateOutputType = {
    id: string | null
    name: string | null
    contactName: string | null
    email: string | null
    phone: string | null
    billingAddress: string | null
    shippingAddress: string | null
    notes: string | null
    quickbooksId: string | null
    syncStatus: $Enums.SyncStatus | null
    lastSyncedAt: Date | null
    syncError: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: string | null
    name: string | null
    contactName: string | null
    email: string | null
    phone: string | null
    billingAddress: string | null
    shippingAddress: string | null
    notes: string | null
    quickbooksId: string | null
    syncStatus: $Enums.SyncStatus | null
    lastSyncedAt: Date | null
    syncError: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    name: number
    contactName: number
    email: number
    phone: number
    billingAddress: number
    shippingAddress: number
    notes: number
    quickbooksId: number
    syncStatus: number
    lastSyncedAt: number
    syncError: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomerMinAggregateInputType = {
    id?: true
    name?: true
    contactName?: true
    email?: true
    phone?: true
    billingAddress?: true
    shippingAddress?: true
    notes?: true
    quickbooksId?: true
    syncStatus?: true
    lastSyncedAt?: true
    syncError?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    name?: true
    contactName?: true
    email?: true
    phone?: true
    billingAddress?: true
    shippingAddress?: true
    notes?: true
    quickbooksId?: true
    syncStatus?: true
    lastSyncedAt?: true
    syncError?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    name?: true
    contactName?: true
    email?: true
    phone?: true
    billingAddress?: true
    shippingAddress?: true
    notes?: true
    quickbooksId?: true
    syncStatus?: true
    lastSyncedAt?: true
    syncError?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    id: string
    name: string
    contactName: string | null
    email: string | null
    phone: string | null
    billingAddress: string | null
    shippingAddress: string | null
    notes: string | null
    quickbooksId: string | null
    syncStatus: $Enums.SyncStatus
    lastSyncedAt: Date | null
    syncError: string | null
    createdAt: Date
    updatedAt: Date
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    contactName?: boolean
    email?: boolean
    phone?: boolean
    billingAddress?: boolean
    shippingAddress?: boolean
    notes?: boolean
    quickbooksId?: boolean
    syncStatus?: boolean
    lastSyncedAt?: boolean
    syncError?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    purchaseOrders?: boolean | Customer$purchaseOrdersArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    contactName?: boolean
    email?: boolean
    phone?: boolean
    billingAddress?: boolean
    shippingAddress?: boolean
    notes?: boolean
    quickbooksId?: boolean
    syncStatus?: boolean
    lastSyncedAt?: boolean
    syncError?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    contactName?: boolean
    email?: boolean
    phone?: boolean
    billingAddress?: boolean
    shippingAddress?: boolean
    notes?: boolean
    quickbooksId?: boolean
    syncStatus?: boolean
    lastSyncedAt?: boolean
    syncError?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectScalar = {
    id?: boolean
    name?: boolean
    contactName?: boolean
    email?: boolean
    phone?: boolean
    billingAddress?: boolean
    shippingAddress?: boolean
    notes?: boolean
    quickbooksId?: boolean
    syncStatus?: boolean
    lastSyncedAt?: boolean
    syncError?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CustomerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "contactName" | "email" | "phone" | "billingAddress" | "shippingAddress" | "notes" | "quickbooksId" | "syncStatus" | "lastSyncedAt" | "syncError" | "createdAt" | "updatedAt", ExtArgs["result"]["customer"]>
  export type CustomerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    purchaseOrders?: boolean | Customer$purchaseOrdersArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CustomerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {
      purchaseOrders: Prisma.$PurchaseOrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      contactName: string | null
      email: string | null
      phone: string | null
      billingAddress: string | null
      shippingAddress: string | null
      notes: string | null
      quickbooksId: string | null
      syncStatus: $Enums.SyncStatus
      lastSyncedAt: Date | null
      syncError: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customers and returns the data saved in the database.
     * @param {CustomerCreateManyAndReturnArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers and returns the data updated in the database.
     * @param {CustomerUpdateManyAndReturnArgs} args - Arguments to update many Customers.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CustomerUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    purchaseOrders<T extends Customer$purchaseOrdersArgs<ExtArgs> = {}>(args?: Subset<T, Customer$purchaseOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Customer model
   */
  interface CustomerFieldRefs {
    readonly id: FieldRef<"Customer", 'String'>
    readonly name: FieldRef<"Customer", 'String'>
    readonly contactName: FieldRef<"Customer", 'String'>
    readonly email: FieldRef<"Customer", 'String'>
    readonly phone: FieldRef<"Customer", 'String'>
    readonly billingAddress: FieldRef<"Customer", 'String'>
    readonly shippingAddress: FieldRef<"Customer", 'String'>
    readonly notes: FieldRef<"Customer", 'String'>
    readonly quickbooksId: FieldRef<"Customer", 'String'>
    readonly syncStatus: FieldRef<"Customer", 'SyncStatus'>
    readonly lastSyncedAt: FieldRef<"Customer", 'DateTime'>
    readonly syncError: FieldRef<"Customer", 'String'>
    readonly createdAt: FieldRef<"Customer", 'DateTime'>
    readonly updatedAt: FieldRef<"Customer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer createManyAndReturn
   */
  export type CustomerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer updateManyAndReturn
   */
  export type CustomerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to delete.
     */
    limit?: number
  }

  /**
   * Customer.purchaseOrders
   */
  export type Customer$purchaseOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrder
     */
    select?: PurchaseOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PurchaseOrder
     */
    omit?: PurchaseOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderInclude<ExtArgs> | null
    where?: PurchaseOrderWhereInput
    orderBy?: PurchaseOrderOrderByWithRelationInput | PurchaseOrderOrderByWithRelationInput[]
    cursor?: PurchaseOrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PurchaseOrderScalarFieldEnum | PurchaseOrderScalarFieldEnum[]
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
  }


  /**
   * Model PurchaseOrder
   */

  export type AggregatePurchaseOrder = {
    _count: PurchaseOrderCountAggregateOutputType | null
    _min: PurchaseOrderMinAggregateOutputType | null
    _max: PurchaseOrderMaxAggregateOutputType | null
  }

  export type PurchaseOrderMinAggregateOutputType = {
    id: string | null
    systemOrderId: string | null
    customerId: string | null
    poNumber: string | null
    dueDate: Date | null
    priority: $Enums.OrderPriority | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PurchaseOrderMaxAggregateOutputType = {
    id: string | null
    systemOrderId: string | null
    customerId: string | null
    poNumber: string | null
    dueDate: Date | null
    priority: $Enums.OrderPriority | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PurchaseOrderCountAggregateOutputType = {
    id: number
    systemOrderId: number
    customerId: number
    poNumber: number
    dueDate: number
    priority: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PurchaseOrderMinAggregateInputType = {
    id?: true
    systemOrderId?: true
    customerId?: true
    poNumber?: true
    dueDate?: true
    priority?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PurchaseOrderMaxAggregateInputType = {
    id?: true
    systemOrderId?: true
    customerId?: true
    poNumber?: true
    dueDate?: true
    priority?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PurchaseOrderCountAggregateInputType = {
    id?: true
    systemOrderId?: true
    customerId?: true
    poNumber?: true
    dueDate?: true
    priority?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PurchaseOrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PurchaseOrder to aggregate.
     */
    where?: PurchaseOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PurchaseOrders to fetch.
     */
    orderBy?: PurchaseOrderOrderByWithRelationInput | PurchaseOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PurchaseOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PurchaseOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PurchaseOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PurchaseOrders
    **/
    _count?: true | PurchaseOrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PurchaseOrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PurchaseOrderMaxAggregateInputType
  }

  export type GetPurchaseOrderAggregateType<T extends PurchaseOrderAggregateArgs> = {
        [P in keyof T & keyof AggregatePurchaseOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePurchaseOrder[P]>
      : GetScalarType<T[P], AggregatePurchaseOrder[P]>
  }




  export type PurchaseOrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PurchaseOrderWhereInput
    orderBy?: PurchaseOrderOrderByWithAggregationInput | PurchaseOrderOrderByWithAggregationInput[]
    by: PurchaseOrderScalarFieldEnum[] | PurchaseOrderScalarFieldEnum
    having?: PurchaseOrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PurchaseOrderCountAggregateInputType | true
    _min?: PurchaseOrderMinAggregateInputType
    _max?: PurchaseOrderMaxAggregateInputType
  }

  export type PurchaseOrderGroupByOutputType = {
    id: string
    systemOrderId: string
    customerId: string
    poNumber: string
    dueDate: Date
    priority: $Enums.OrderPriority
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: PurchaseOrderCountAggregateOutputType | null
    _min: PurchaseOrderMinAggregateOutputType | null
    _max: PurchaseOrderMaxAggregateOutputType | null
  }

  type GetPurchaseOrderGroupByPayload<T extends PurchaseOrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PurchaseOrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PurchaseOrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PurchaseOrderGroupByOutputType[P]>
            : GetScalarType<T[P], PurchaseOrderGroupByOutputType[P]>
        }
      >
    >


  export type PurchaseOrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    systemOrderId?: boolean
    customerId?: boolean
    poNumber?: boolean
    dueDate?: boolean
    priority?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    lineItems?: boolean | PurchaseOrder$lineItemsArgs<ExtArgs>
    _count?: boolean | PurchaseOrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["purchaseOrder"]>

  export type PurchaseOrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    systemOrderId?: boolean
    customerId?: boolean
    poNumber?: boolean
    dueDate?: boolean
    priority?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["purchaseOrder"]>

  export type PurchaseOrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    systemOrderId?: boolean
    customerId?: boolean
    poNumber?: boolean
    dueDate?: boolean
    priority?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["purchaseOrder"]>

  export type PurchaseOrderSelectScalar = {
    id?: boolean
    systemOrderId?: boolean
    customerId?: boolean
    poNumber?: boolean
    dueDate?: boolean
    priority?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PurchaseOrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "systemOrderId" | "customerId" | "poNumber" | "dueDate" | "priority" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["purchaseOrder"]>
  export type PurchaseOrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    lineItems?: boolean | PurchaseOrder$lineItemsArgs<ExtArgs>
    _count?: boolean | PurchaseOrderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PurchaseOrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type PurchaseOrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }

  export type $PurchaseOrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PurchaseOrder"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
      lineItems: Prisma.$OrderLineItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      systemOrderId: string
      customerId: string
      poNumber: string
      dueDate: Date
      priority: $Enums.OrderPriority
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["purchaseOrder"]>
    composites: {}
  }

  type PurchaseOrderGetPayload<S extends boolean | null | undefined | PurchaseOrderDefaultArgs> = $Result.GetResult<Prisma.$PurchaseOrderPayload, S>

  type PurchaseOrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PurchaseOrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PurchaseOrderCountAggregateInputType | true
    }

  export interface PurchaseOrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PurchaseOrder'], meta: { name: 'PurchaseOrder' } }
    /**
     * Find zero or one PurchaseOrder that matches the filter.
     * @param {PurchaseOrderFindUniqueArgs} args - Arguments to find a PurchaseOrder
     * @example
     * // Get one PurchaseOrder
     * const purchaseOrder = await prisma.purchaseOrder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PurchaseOrderFindUniqueArgs>(args: SelectSubset<T, PurchaseOrderFindUniqueArgs<ExtArgs>>): Prisma__PurchaseOrderClient<$Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PurchaseOrder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PurchaseOrderFindUniqueOrThrowArgs} args - Arguments to find a PurchaseOrder
     * @example
     * // Get one PurchaseOrder
     * const purchaseOrder = await prisma.purchaseOrder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PurchaseOrderFindUniqueOrThrowArgs>(args: SelectSubset<T, PurchaseOrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PurchaseOrderClient<$Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PurchaseOrder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseOrderFindFirstArgs} args - Arguments to find a PurchaseOrder
     * @example
     * // Get one PurchaseOrder
     * const purchaseOrder = await prisma.purchaseOrder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PurchaseOrderFindFirstArgs>(args?: SelectSubset<T, PurchaseOrderFindFirstArgs<ExtArgs>>): Prisma__PurchaseOrderClient<$Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PurchaseOrder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseOrderFindFirstOrThrowArgs} args - Arguments to find a PurchaseOrder
     * @example
     * // Get one PurchaseOrder
     * const purchaseOrder = await prisma.purchaseOrder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PurchaseOrderFindFirstOrThrowArgs>(args?: SelectSubset<T, PurchaseOrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__PurchaseOrderClient<$Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PurchaseOrders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseOrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PurchaseOrders
     * const purchaseOrders = await prisma.purchaseOrder.findMany()
     * 
     * // Get first 10 PurchaseOrders
     * const purchaseOrders = await prisma.purchaseOrder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const purchaseOrderWithIdOnly = await prisma.purchaseOrder.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PurchaseOrderFindManyArgs>(args?: SelectSubset<T, PurchaseOrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PurchaseOrder.
     * @param {PurchaseOrderCreateArgs} args - Arguments to create a PurchaseOrder.
     * @example
     * // Create one PurchaseOrder
     * const PurchaseOrder = await prisma.purchaseOrder.create({
     *   data: {
     *     // ... data to create a PurchaseOrder
     *   }
     * })
     * 
     */
    create<T extends PurchaseOrderCreateArgs>(args: SelectSubset<T, PurchaseOrderCreateArgs<ExtArgs>>): Prisma__PurchaseOrderClient<$Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PurchaseOrders.
     * @param {PurchaseOrderCreateManyArgs} args - Arguments to create many PurchaseOrders.
     * @example
     * // Create many PurchaseOrders
     * const purchaseOrder = await prisma.purchaseOrder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PurchaseOrderCreateManyArgs>(args?: SelectSubset<T, PurchaseOrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PurchaseOrders and returns the data saved in the database.
     * @param {PurchaseOrderCreateManyAndReturnArgs} args - Arguments to create many PurchaseOrders.
     * @example
     * // Create many PurchaseOrders
     * const purchaseOrder = await prisma.purchaseOrder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PurchaseOrders and only return the `id`
     * const purchaseOrderWithIdOnly = await prisma.purchaseOrder.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PurchaseOrderCreateManyAndReturnArgs>(args?: SelectSubset<T, PurchaseOrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PurchaseOrder.
     * @param {PurchaseOrderDeleteArgs} args - Arguments to delete one PurchaseOrder.
     * @example
     * // Delete one PurchaseOrder
     * const PurchaseOrder = await prisma.purchaseOrder.delete({
     *   where: {
     *     // ... filter to delete one PurchaseOrder
     *   }
     * })
     * 
     */
    delete<T extends PurchaseOrderDeleteArgs>(args: SelectSubset<T, PurchaseOrderDeleteArgs<ExtArgs>>): Prisma__PurchaseOrderClient<$Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PurchaseOrder.
     * @param {PurchaseOrderUpdateArgs} args - Arguments to update one PurchaseOrder.
     * @example
     * // Update one PurchaseOrder
     * const purchaseOrder = await prisma.purchaseOrder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PurchaseOrderUpdateArgs>(args: SelectSubset<T, PurchaseOrderUpdateArgs<ExtArgs>>): Prisma__PurchaseOrderClient<$Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PurchaseOrders.
     * @param {PurchaseOrderDeleteManyArgs} args - Arguments to filter PurchaseOrders to delete.
     * @example
     * // Delete a few PurchaseOrders
     * const { count } = await prisma.purchaseOrder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PurchaseOrderDeleteManyArgs>(args?: SelectSubset<T, PurchaseOrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PurchaseOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseOrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PurchaseOrders
     * const purchaseOrder = await prisma.purchaseOrder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PurchaseOrderUpdateManyArgs>(args: SelectSubset<T, PurchaseOrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PurchaseOrders and returns the data updated in the database.
     * @param {PurchaseOrderUpdateManyAndReturnArgs} args - Arguments to update many PurchaseOrders.
     * @example
     * // Update many PurchaseOrders
     * const purchaseOrder = await prisma.purchaseOrder.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PurchaseOrders and only return the `id`
     * const purchaseOrderWithIdOnly = await prisma.purchaseOrder.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PurchaseOrderUpdateManyAndReturnArgs>(args: SelectSubset<T, PurchaseOrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PurchaseOrder.
     * @param {PurchaseOrderUpsertArgs} args - Arguments to update or create a PurchaseOrder.
     * @example
     * // Update or create a PurchaseOrder
     * const purchaseOrder = await prisma.purchaseOrder.upsert({
     *   create: {
     *     // ... data to create a PurchaseOrder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PurchaseOrder we want to update
     *   }
     * })
     */
    upsert<T extends PurchaseOrderUpsertArgs>(args: SelectSubset<T, PurchaseOrderUpsertArgs<ExtArgs>>): Prisma__PurchaseOrderClient<$Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PurchaseOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseOrderCountArgs} args - Arguments to filter PurchaseOrders to count.
     * @example
     * // Count the number of PurchaseOrders
     * const count = await prisma.purchaseOrder.count({
     *   where: {
     *     // ... the filter for the PurchaseOrders we want to count
     *   }
     * })
    **/
    count<T extends PurchaseOrderCountArgs>(
      args?: Subset<T, PurchaseOrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PurchaseOrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PurchaseOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseOrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PurchaseOrderAggregateArgs>(args: Subset<T, PurchaseOrderAggregateArgs>): Prisma.PrismaPromise<GetPurchaseOrderAggregateType<T>>

    /**
     * Group by PurchaseOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseOrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PurchaseOrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PurchaseOrderGroupByArgs['orderBy'] }
        : { orderBy?: PurchaseOrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PurchaseOrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPurchaseOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PurchaseOrder model
   */
  readonly fields: PurchaseOrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PurchaseOrder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PurchaseOrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    lineItems<T extends PurchaseOrder$lineItemsArgs<ExtArgs> = {}>(args?: Subset<T, PurchaseOrder$lineItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderLineItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PurchaseOrder model
   */
  interface PurchaseOrderFieldRefs {
    readonly id: FieldRef<"PurchaseOrder", 'String'>
    readonly systemOrderId: FieldRef<"PurchaseOrder", 'String'>
    readonly customerId: FieldRef<"PurchaseOrder", 'String'>
    readonly poNumber: FieldRef<"PurchaseOrder", 'String'>
    readonly dueDate: FieldRef<"PurchaseOrder", 'DateTime'>
    readonly priority: FieldRef<"PurchaseOrder", 'OrderPriority'>
    readonly notes: FieldRef<"PurchaseOrder", 'String'>
    readonly createdAt: FieldRef<"PurchaseOrder", 'DateTime'>
    readonly updatedAt: FieldRef<"PurchaseOrder", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PurchaseOrder findUnique
   */
  export type PurchaseOrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrder
     */
    select?: PurchaseOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PurchaseOrder
     */
    omit?: PurchaseOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseOrder to fetch.
     */
    where: PurchaseOrderWhereUniqueInput
  }

  /**
   * PurchaseOrder findUniqueOrThrow
   */
  export type PurchaseOrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrder
     */
    select?: PurchaseOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PurchaseOrder
     */
    omit?: PurchaseOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseOrder to fetch.
     */
    where: PurchaseOrderWhereUniqueInput
  }

  /**
   * PurchaseOrder findFirst
   */
  export type PurchaseOrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrder
     */
    select?: PurchaseOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PurchaseOrder
     */
    omit?: PurchaseOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseOrder to fetch.
     */
    where?: PurchaseOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PurchaseOrders to fetch.
     */
    orderBy?: PurchaseOrderOrderByWithRelationInput | PurchaseOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PurchaseOrders.
     */
    cursor?: PurchaseOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PurchaseOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PurchaseOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PurchaseOrders.
     */
    distinct?: PurchaseOrderScalarFieldEnum | PurchaseOrderScalarFieldEnum[]
  }

  /**
   * PurchaseOrder findFirstOrThrow
   */
  export type PurchaseOrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrder
     */
    select?: PurchaseOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PurchaseOrder
     */
    omit?: PurchaseOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseOrder to fetch.
     */
    where?: PurchaseOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PurchaseOrders to fetch.
     */
    orderBy?: PurchaseOrderOrderByWithRelationInput | PurchaseOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PurchaseOrders.
     */
    cursor?: PurchaseOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PurchaseOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PurchaseOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PurchaseOrders.
     */
    distinct?: PurchaseOrderScalarFieldEnum | PurchaseOrderScalarFieldEnum[]
  }

  /**
   * PurchaseOrder findMany
   */
  export type PurchaseOrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrder
     */
    select?: PurchaseOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PurchaseOrder
     */
    omit?: PurchaseOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseOrders to fetch.
     */
    where?: PurchaseOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PurchaseOrders to fetch.
     */
    orderBy?: PurchaseOrderOrderByWithRelationInput | PurchaseOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PurchaseOrders.
     */
    cursor?: PurchaseOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PurchaseOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PurchaseOrders.
     */
    skip?: number
    distinct?: PurchaseOrderScalarFieldEnum | PurchaseOrderScalarFieldEnum[]
  }

  /**
   * PurchaseOrder create
   */
  export type PurchaseOrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrder
     */
    select?: PurchaseOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PurchaseOrder
     */
    omit?: PurchaseOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderInclude<ExtArgs> | null
    /**
     * The data needed to create a PurchaseOrder.
     */
    data: XOR<PurchaseOrderCreateInput, PurchaseOrderUncheckedCreateInput>
  }

  /**
   * PurchaseOrder createMany
   */
  export type PurchaseOrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PurchaseOrders.
     */
    data: PurchaseOrderCreateManyInput | PurchaseOrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PurchaseOrder createManyAndReturn
   */
  export type PurchaseOrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrder
     */
    select?: PurchaseOrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PurchaseOrder
     */
    omit?: PurchaseOrderOmit<ExtArgs> | null
    /**
     * The data used to create many PurchaseOrders.
     */
    data: PurchaseOrderCreateManyInput | PurchaseOrderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PurchaseOrder update
   */
  export type PurchaseOrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrder
     */
    select?: PurchaseOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PurchaseOrder
     */
    omit?: PurchaseOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderInclude<ExtArgs> | null
    /**
     * The data needed to update a PurchaseOrder.
     */
    data: XOR<PurchaseOrderUpdateInput, PurchaseOrderUncheckedUpdateInput>
    /**
     * Choose, which PurchaseOrder to update.
     */
    where: PurchaseOrderWhereUniqueInput
  }

  /**
   * PurchaseOrder updateMany
   */
  export type PurchaseOrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PurchaseOrders.
     */
    data: XOR<PurchaseOrderUpdateManyMutationInput, PurchaseOrderUncheckedUpdateManyInput>
    /**
     * Filter which PurchaseOrders to update
     */
    where?: PurchaseOrderWhereInput
    /**
     * Limit how many PurchaseOrders to update.
     */
    limit?: number
  }

  /**
   * PurchaseOrder updateManyAndReturn
   */
  export type PurchaseOrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrder
     */
    select?: PurchaseOrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PurchaseOrder
     */
    omit?: PurchaseOrderOmit<ExtArgs> | null
    /**
     * The data used to update PurchaseOrders.
     */
    data: XOR<PurchaseOrderUpdateManyMutationInput, PurchaseOrderUncheckedUpdateManyInput>
    /**
     * Filter which PurchaseOrders to update
     */
    where?: PurchaseOrderWhereInput
    /**
     * Limit how many PurchaseOrders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PurchaseOrder upsert
   */
  export type PurchaseOrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrder
     */
    select?: PurchaseOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PurchaseOrder
     */
    omit?: PurchaseOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderInclude<ExtArgs> | null
    /**
     * The filter to search for the PurchaseOrder to update in case it exists.
     */
    where: PurchaseOrderWhereUniqueInput
    /**
     * In case the PurchaseOrder found by the `where` argument doesn't exist, create a new PurchaseOrder with this data.
     */
    create: XOR<PurchaseOrderCreateInput, PurchaseOrderUncheckedCreateInput>
    /**
     * In case the PurchaseOrder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PurchaseOrderUpdateInput, PurchaseOrderUncheckedUpdateInput>
  }

  /**
   * PurchaseOrder delete
   */
  export type PurchaseOrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrder
     */
    select?: PurchaseOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PurchaseOrder
     */
    omit?: PurchaseOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderInclude<ExtArgs> | null
    /**
     * Filter which PurchaseOrder to delete.
     */
    where: PurchaseOrderWhereUniqueInput
  }

  /**
   * PurchaseOrder deleteMany
   */
  export type PurchaseOrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PurchaseOrders to delete
     */
    where?: PurchaseOrderWhereInput
    /**
     * Limit how many PurchaseOrders to delete.
     */
    limit?: number
  }

  /**
   * PurchaseOrder.lineItems
   */
  export type PurchaseOrder$lineItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderLineItem
     */
    select?: OrderLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderLineItem
     */
    omit?: OrderLineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderLineItemInclude<ExtArgs> | null
    where?: OrderLineItemWhereInput
    orderBy?: OrderLineItemOrderByWithRelationInput | OrderLineItemOrderByWithRelationInput[]
    cursor?: OrderLineItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderLineItemScalarFieldEnum | OrderLineItemScalarFieldEnum[]
  }

  /**
   * PurchaseOrder without action
   */
  export type PurchaseOrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrder
     */
    select?: PurchaseOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PurchaseOrder
     */
    omit?: PurchaseOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderInclude<ExtArgs> | null
  }


  /**
   * Model OrderLineItem
   */

  export type AggregateOrderLineItem = {
    _count: OrderLineItemCountAggregateOutputType | null
    _avg: OrderLineItemAvgAggregateOutputType | null
    _sum: OrderLineItemSumAggregateOutputType | null
    _min: OrderLineItemMinAggregateOutputType | null
    _max: OrderLineItemMaxAggregateOutputType | null
  }

  export type OrderLineItemAvgAggregateOutputType = {
    quantity: number | null
  }

  export type OrderLineItemSumAggregateOutputType = {
    quantity: number | null
  }

  export type OrderLineItemMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    partNumber: string | null
    partName: string | null
    drawingNumber: string | null
    revisionLevel: string | null
    quantity: number | null
    dueDate: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderLineItemMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    partNumber: string | null
    partName: string | null
    drawingNumber: string | null
    revisionLevel: string | null
    quantity: number | null
    dueDate: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderLineItemCountAggregateOutputType = {
    id: number
    orderId: number
    partNumber: number
    partName: number
    drawingNumber: number
    revisionLevel: number
    quantity: number
    dueDate: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrderLineItemAvgAggregateInputType = {
    quantity?: true
  }

  export type OrderLineItemSumAggregateInputType = {
    quantity?: true
  }

  export type OrderLineItemMinAggregateInputType = {
    id?: true
    orderId?: true
    partNumber?: true
    partName?: true
    drawingNumber?: true
    revisionLevel?: true
    quantity?: true
    dueDate?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderLineItemMaxAggregateInputType = {
    id?: true
    orderId?: true
    partNumber?: true
    partName?: true
    drawingNumber?: true
    revisionLevel?: true
    quantity?: true
    dueDate?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderLineItemCountAggregateInputType = {
    id?: true
    orderId?: true
    partNumber?: true
    partName?: true
    drawingNumber?: true
    revisionLevel?: true
    quantity?: true
    dueDate?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrderLineItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderLineItem to aggregate.
     */
    where?: OrderLineItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderLineItems to fetch.
     */
    orderBy?: OrderLineItemOrderByWithRelationInput | OrderLineItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderLineItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderLineItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderLineItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderLineItems
    **/
    _count?: true | OrderLineItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderLineItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderLineItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderLineItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderLineItemMaxAggregateInputType
  }

  export type GetOrderLineItemAggregateType<T extends OrderLineItemAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderLineItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderLineItem[P]>
      : GetScalarType<T[P], AggregateOrderLineItem[P]>
  }




  export type OrderLineItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderLineItemWhereInput
    orderBy?: OrderLineItemOrderByWithAggregationInput | OrderLineItemOrderByWithAggregationInput[]
    by: OrderLineItemScalarFieldEnum[] | OrderLineItemScalarFieldEnum
    having?: OrderLineItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderLineItemCountAggregateInputType | true
    _avg?: OrderLineItemAvgAggregateInputType
    _sum?: OrderLineItemSumAggregateInputType
    _min?: OrderLineItemMinAggregateInputType
    _max?: OrderLineItemMaxAggregateInputType
  }

  export type OrderLineItemGroupByOutputType = {
    id: string
    orderId: string
    partNumber: string
    partName: string
    drawingNumber: string | null
    revisionLevel: string | null
    quantity: number
    dueDate: Date | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: OrderLineItemCountAggregateOutputType | null
    _avg: OrderLineItemAvgAggregateOutputType | null
    _sum: OrderLineItemSumAggregateOutputType | null
    _min: OrderLineItemMinAggregateOutputType | null
    _max: OrderLineItemMaxAggregateOutputType | null
  }

  type GetOrderLineItemGroupByPayload<T extends OrderLineItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderLineItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderLineItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderLineItemGroupByOutputType[P]>
            : GetScalarType<T[P], OrderLineItemGroupByOutputType[P]>
        }
      >
    >


  export type OrderLineItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    partNumber?: boolean
    partName?: boolean
    drawingNumber?: boolean
    revisionLevel?: boolean
    quantity?: boolean
    dueDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    purchaseOrder?: boolean | PurchaseOrderDefaultArgs<ExtArgs>
    fileAttachments?: boolean | OrderLineItem$fileAttachmentsArgs<ExtArgs>
    batches?: boolean | OrderLineItem$batchesArgs<ExtArgs>
    _count?: boolean | OrderLineItemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderLineItem"]>

  export type OrderLineItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    partNumber?: boolean
    partName?: boolean
    drawingNumber?: boolean
    revisionLevel?: boolean
    quantity?: boolean
    dueDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    purchaseOrder?: boolean | PurchaseOrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderLineItem"]>

  export type OrderLineItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    partNumber?: boolean
    partName?: boolean
    drawingNumber?: boolean
    revisionLevel?: boolean
    quantity?: boolean
    dueDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    purchaseOrder?: boolean | PurchaseOrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderLineItem"]>

  export type OrderLineItemSelectScalar = {
    id?: boolean
    orderId?: boolean
    partNumber?: boolean
    partName?: boolean
    drawingNumber?: boolean
    revisionLevel?: boolean
    quantity?: boolean
    dueDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrderLineItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "partNumber" | "partName" | "drawingNumber" | "revisionLevel" | "quantity" | "dueDate" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["orderLineItem"]>
  export type OrderLineItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    purchaseOrder?: boolean | PurchaseOrderDefaultArgs<ExtArgs>
    fileAttachments?: boolean | OrderLineItem$fileAttachmentsArgs<ExtArgs>
    batches?: boolean | OrderLineItem$batchesArgs<ExtArgs>
    _count?: boolean | OrderLineItemCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrderLineItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    purchaseOrder?: boolean | PurchaseOrderDefaultArgs<ExtArgs>
  }
  export type OrderLineItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    purchaseOrder?: boolean | PurchaseOrderDefaultArgs<ExtArgs>
  }

  export type $OrderLineItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderLineItem"
    objects: {
      purchaseOrder: Prisma.$PurchaseOrderPayload<ExtArgs>
      fileAttachments: Prisma.$FileAttachmentPayload<ExtArgs>[]
      batches: Prisma.$BatchPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      partNumber: string
      partName: string
      drawingNumber: string | null
      revisionLevel: string | null
      quantity: number
      dueDate: Date | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["orderLineItem"]>
    composites: {}
  }

  type OrderLineItemGetPayload<S extends boolean | null | undefined | OrderLineItemDefaultArgs> = $Result.GetResult<Prisma.$OrderLineItemPayload, S>

  type OrderLineItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderLineItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderLineItemCountAggregateInputType | true
    }

  export interface OrderLineItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderLineItem'], meta: { name: 'OrderLineItem' } }
    /**
     * Find zero or one OrderLineItem that matches the filter.
     * @param {OrderLineItemFindUniqueArgs} args - Arguments to find a OrderLineItem
     * @example
     * // Get one OrderLineItem
     * const orderLineItem = await prisma.orderLineItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderLineItemFindUniqueArgs>(args: SelectSubset<T, OrderLineItemFindUniqueArgs<ExtArgs>>): Prisma__OrderLineItemClient<$Result.GetResult<Prisma.$OrderLineItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderLineItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderLineItemFindUniqueOrThrowArgs} args - Arguments to find a OrderLineItem
     * @example
     * // Get one OrderLineItem
     * const orderLineItem = await prisma.orderLineItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderLineItemFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderLineItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderLineItemClient<$Result.GetResult<Prisma.$OrderLineItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderLineItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderLineItemFindFirstArgs} args - Arguments to find a OrderLineItem
     * @example
     * // Get one OrderLineItem
     * const orderLineItem = await prisma.orderLineItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderLineItemFindFirstArgs>(args?: SelectSubset<T, OrderLineItemFindFirstArgs<ExtArgs>>): Prisma__OrderLineItemClient<$Result.GetResult<Prisma.$OrderLineItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderLineItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderLineItemFindFirstOrThrowArgs} args - Arguments to find a OrderLineItem
     * @example
     * // Get one OrderLineItem
     * const orderLineItem = await prisma.orderLineItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderLineItemFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderLineItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderLineItemClient<$Result.GetResult<Prisma.$OrderLineItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderLineItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderLineItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderLineItems
     * const orderLineItems = await prisma.orderLineItem.findMany()
     * 
     * // Get first 10 OrderLineItems
     * const orderLineItems = await prisma.orderLineItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderLineItemWithIdOnly = await prisma.orderLineItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderLineItemFindManyArgs>(args?: SelectSubset<T, OrderLineItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderLineItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderLineItem.
     * @param {OrderLineItemCreateArgs} args - Arguments to create a OrderLineItem.
     * @example
     * // Create one OrderLineItem
     * const OrderLineItem = await prisma.orderLineItem.create({
     *   data: {
     *     // ... data to create a OrderLineItem
     *   }
     * })
     * 
     */
    create<T extends OrderLineItemCreateArgs>(args: SelectSubset<T, OrderLineItemCreateArgs<ExtArgs>>): Prisma__OrderLineItemClient<$Result.GetResult<Prisma.$OrderLineItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderLineItems.
     * @param {OrderLineItemCreateManyArgs} args - Arguments to create many OrderLineItems.
     * @example
     * // Create many OrderLineItems
     * const orderLineItem = await prisma.orderLineItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderLineItemCreateManyArgs>(args?: SelectSubset<T, OrderLineItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderLineItems and returns the data saved in the database.
     * @param {OrderLineItemCreateManyAndReturnArgs} args - Arguments to create many OrderLineItems.
     * @example
     * // Create many OrderLineItems
     * const orderLineItem = await prisma.orderLineItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderLineItems and only return the `id`
     * const orderLineItemWithIdOnly = await prisma.orderLineItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderLineItemCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderLineItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderLineItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrderLineItem.
     * @param {OrderLineItemDeleteArgs} args - Arguments to delete one OrderLineItem.
     * @example
     * // Delete one OrderLineItem
     * const OrderLineItem = await prisma.orderLineItem.delete({
     *   where: {
     *     // ... filter to delete one OrderLineItem
     *   }
     * })
     * 
     */
    delete<T extends OrderLineItemDeleteArgs>(args: SelectSubset<T, OrderLineItemDeleteArgs<ExtArgs>>): Prisma__OrderLineItemClient<$Result.GetResult<Prisma.$OrderLineItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderLineItem.
     * @param {OrderLineItemUpdateArgs} args - Arguments to update one OrderLineItem.
     * @example
     * // Update one OrderLineItem
     * const orderLineItem = await prisma.orderLineItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderLineItemUpdateArgs>(args: SelectSubset<T, OrderLineItemUpdateArgs<ExtArgs>>): Prisma__OrderLineItemClient<$Result.GetResult<Prisma.$OrderLineItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderLineItems.
     * @param {OrderLineItemDeleteManyArgs} args - Arguments to filter OrderLineItems to delete.
     * @example
     * // Delete a few OrderLineItems
     * const { count } = await prisma.orderLineItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderLineItemDeleteManyArgs>(args?: SelectSubset<T, OrderLineItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderLineItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderLineItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderLineItems
     * const orderLineItem = await prisma.orderLineItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderLineItemUpdateManyArgs>(args: SelectSubset<T, OrderLineItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderLineItems and returns the data updated in the database.
     * @param {OrderLineItemUpdateManyAndReturnArgs} args - Arguments to update many OrderLineItems.
     * @example
     * // Update many OrderLineItems
     * const orderLineItem = await prisma.orderLineItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrderLineItems and only return the `id`
     * const orderLineItemWithIdOnly = await prisma.orderLineItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderLineItemUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderLineItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderLineItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrderLineItem.
     * @param {OrderLineItemUpsertArgs} args - Arguments to update or create a OrderLineItem.
     * @example
     * // Update or create a OrderLineItem
     * const orderLineItem = await prisma.orderLineItem.upsert({
     *   create: {
     *     // ... data to create a OrderLineItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderLineItem we want to update
     *   }
     * })
     */
    upsert<T extends OrderLineItemUpsertArgs>(args: SelectSubset<T, OrderLineItemUpsertArgs<ExtArgs>>): Prisma__OrderLineItemClient<$Result.GetResult<Prisma.$OrderLineItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderLineItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderLineItemCountArgs} args - Arguments to filter OrderLineItems to count.
     * @example
     * // Count the number of OrderLineItems
     * const count = await prisma.orderLineItem.count({
     *   where: {
     *     // ... the filter for the OrderLineItems we want to count
     *   }
     * })
    **/
    count<T extends OrderLineItemCountArgs>(
      args?: Subset<T, OrderLineItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderLineItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderLineItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderLineItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderLineItemAggregateArgs>(args: Subset<T, OrderLineItemAggregateArgs>): Prisma.PrismaPromise<GetOrderLineItemAggregateType<T>>

    /**
     * Group by OrderLineItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderLineItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderLineItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderLineItemGroupByArgs['orderBy'] }
        : { orderBy?: OrderLineItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderLineItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderLineItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderLineItem model
   */
  readonly fields: OrderLineItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderLineItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderLineItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    purchaseOrder<T extends PurchaseOrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PurchaseOrderDefaultArgs<ExtArgs>>): Prisma__PurchaseOrderClient<$Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    fileAttachments<T extends OrderLineItem$fileAttachmentsArgs<ExtArgs> = {}>(args?: Subset<T, OrderLineItem$fileAttachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FileAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    batches<T extends OrderLineItem$batchesArgs<ExtArgs> = {}>(args?: Subset<T, OrderLineItem$batchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrderLineItem model
   */
  interface OrderLineItemFieldRefs {
    readonly id: FieldRef<"OrderLineItem", 'String'>
    readonly orderId: FieldRef<"OrderLineItem", 'String'>
    readonly partNumber: FieldRef<"OrderLineItem", 'String'>
    readonly partName: FieldRef<"OrderLineItem", 'String'>
    readonly drawingNumber: FieldRef<"OrderLineItem", 'String'>
    readonly revisionLevel: FieldRef<"OrderLineItem", 'String'>
    readonly quantity: FieldRef<"OrderLineItem", 'Int'>
    readonly dueDate: FieldRef<"OrderLineItem", 'DateTime'>
    readonly notes: FieldRef<"OrderLineItem", 'String'>
    readonly createdAt: FieldRef<"OrderLineItem", 'DateTime'>
    readonly updatedAt: FieldRef<"OrderLineItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrderLineItem findUnique
   */
  export type OrderLineItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderLineItem
     */
    select?: OrderLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderLineItem
     */
    omit?: OrderLineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderLineItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderLineItem to fetch.
     */
    where: OrderLineItemWhereUniqueInput
  }

  /**
   * OrderLineItem findUniqueOrThrow
   */
  export type OrderLineItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderLineItem
     */
    select?: OrderLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderLineItem
     */
    omit?: OrderLineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderLineItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderLineItem to fetch.
     */
    where: OrderLineItemWhereUniqueInput
  }

  /**
   * OrderLineItem findFirst
   */
  export type OrderLineItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderLineItem
     */
    select?: OrderLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderLineItem
     */
    omit?: OrderLineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderLineItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderLineItem to fetch.
     */
    where?: OrderLineItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderLineItems to fetch.
     */
    orderBy?: OrderLineItemOrderByWithRelationInput | OrderLineItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderLineItems.
     */
    cursor?: OrderLineItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderLineItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderLineItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderLineItems.
     */
    distinct?: OrderLineItemScalarFieldEnum | OrderLineItemScalarFieldEnum[]
  }

  /**
   * OrderLineItem findFirstOrThrow
   */
  export type OrderLineItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderLineItem
     */
    select?: OrderLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderLineItem
     */
    omit?: OrderLineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderLineItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderLineItem to fetch.
     */
    where?: OrderLineItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderLineItems to fetch.
     */
    orderBy?: OrderLineItemOrderByWithRelationInput | OrderLineItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderLineItems.
     */
    cursor?: OrderLineItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderLineItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderLineItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderLineItems.
     */
    distinct?: OrderLineItemScalarFieldEnum | OrderLineItemScalarFieldEnum[]
  }

  /**
   * OrderLineItem findMany
   */
  export type OrderLineItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderLineItem
     */
    select?: OrderLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderLineItem
     */
    omit?: OrderLineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderLineItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderLineItems to fetch.
     */
    where?: OrderLineItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderLineItems to fetch.
     */
    orderBy?: OrderLineItemOrderByWithRelationInput | OrderLineItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderLineItems.
     */
    cursor?: OrderLineItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderLineItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderLineItems.
     */
    skip?: number
    distinct?: OrderLineItemScalarFieldEnum | OrderLineItemScalarFieldEnum[]
  }

  /**
   * OrderLineItem create
   */
  export type OrderLineItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderLineItem
     */
    select?: OrderLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderLineItem
     */
    omit?: OrderLineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderLineItemInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderLineItem.
     */
    data: XOR<OrderLineItemCreateInput, OrderLineItemUncheckedCreateInput>
  }

  /**
   * OrderLineItem createMany
   */
  export type OrderLineItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderLineItems.
     */
    data: OrderLineItemCreateManyInput | OrderLineItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderLineItem createManyAndReturn
   */
  export type OrderLineItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderLineItem
     */
    select?: OrderLineItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderLineItem
     */
    omit?: OrderLineItemOmit<ExtArgs> | null
    /**
     * The data used to create many OrderLineItems.
     */
    data: OrderLineItemCreateManyInput | OrderLineItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderLineItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderLineItem update
   */
  export type OrderLineItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderLineItem
     */
    select?: OrderLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderLineItem
     */
    omit?: OrderLineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderLineItemInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderLineItem.
     */
    data: XOR<OrderLineItemUpdateInput, OrderLineItemUncheckedUpdateInput>
    /**
     * Choose, which OrderLineItem to update.
     */
    where: OrderLineItemWhereUniqueInput
  }

  /**
   * OrderLineItem updateMany
   */
  export type OrderLineItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderLineItems.
     */
    data: XOR<OrderLineItemUpdateManyMutationInput, OrderLineItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderLineItems to update
     */
    where?: OrderLineItemWhereInput
    /**
     * Limit how many OrderLineItems to update.
     */
    limit?: number
  }

  /**
   * OrderLineItem updateManyAndReturn
   */
  export type OrderLineItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderLineItem
     */
    select?: OrderLineItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderLineItem
     */
    omit?: OrderLineItemOmit<ExtArgs> | null
    /**
     * The data used to update OrderLineItems.
     */
    data: XOR<OrderLineItemUpdateManyMutationInput, OrderLineItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderLineItems to update
     */
    where?: OrderLineItemWhereInput
    /**
     * Limit how many OrderLineItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderLineItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderLineItem upsert
   */
  export type OrderLineItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderLineItem
     */
    select?: OrderLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderLineItem
     */
    omit?: OrderLineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderLineItemInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderLineItem to update in case it exists.
     */
    where: OrderLineItemWhereUniqueInput
    /**
     * In case the OrderLineItem found by the `where` argument doesn't exist, create a new OrderLineItem with this data.
     */
    create: XOR<OrderLineItemCreateInput, OrderLineItemUncheckedCreateInput>
    /**
     * In case the OrderLineItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderLineItemUpdateInput, OrderLineItemUncheckedUpdateInput>
  }

  /**
   * OrderLineItem delete
   */
  export type OrderLineItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderLineItem
     */
    select?: OrderLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderLineItem
     */
    omit?: OrderLineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderLineItemInclude<ExtArgs> | null
    /**
     * Filter which OrderLineItem to delete.
     */
    where: OrderLineItemWhereUniqueInput
  }

  /**
   * OrderLineItem deleteMany
   */
  export type OrderLineItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderLineItems to delete
     */
    where?: OrderLineItemWhereInput
    /**
     * Limit how many OrderLineItems to delete.
     */
    limit?: number
  }

  /**
   * OrderLineItem.fileAttachments
   */
  export type OrderLineItem$fileAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileAttachment
     */
    select?: FileAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileAttachment
     */
    omit?: FileAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileAttachmentInclude<ExtArgs> | null
    where?: FileAttachmentWhereInput
    orderBy?: FileAttachmentOrderByWithRelationInput | FileAttachmentOrderByWithRelationInput[]
    cursor?: FileAttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FileAttachmentScalarFieldEnum | FileAttachmentScalarFieldEnum[]
  }

  /**
   * OrderLineItem.batches
   */
  export type OrderLineItem$batchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    where?: BatchWhereInput
    orderBy?: BatchOrderByWithRelationInput | BatchOrderByWithRelationInput[]
    cursor?: BatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BatchScalarFieldEnum | BatchScalarFieldEnum[]
  }

  /**
   * OrderLineItem without action
   */
  export type OrderLineItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderLineItem
     */
    select?: OrderLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderLineItem
     */
    omit?: OrderLineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderLineItemInclude<ExtArgs> | null
  }


  /**
   * Model FileAttachment
   */

  export type AggregateFileAttachment = {
    _count: FileAttachmentCountAggregateOutputType | null
    _min: FileAttachmentMinAggregateOutputType | null
    _max: FileAttachmentMaxAggregateOutputType | null
  }

  export type FileAttachmentMinAggregateOutputType = {
    id: string | null
    lineItemId: string | null
    fileName: string | null
    fileType: string | null
    fileUrl: string | null
    uploadedBy: string | null
    description: string | null
    createdAt: Date | null
  }

  export type FileAttachmentMaxAggregateOutputType = {
    id: string | null
    lineItemId: string | null
    fileName: string | null
    fileType: string | null
    fileUrl: string | null
    uploadedBy: string | null
    description: string | null
    createdAt: Date | null
  }

  export type FileAttachmentCountAggregateOutputType = {
    id: number
    lineItemId: number
    fileName: number
    fileType: number
    fileUrl: number
    uploadedBy: number
    description: number
    createdAt: number
    _all: number
  }


  export type FileAttachmentMinAggregateInputType = {
    id?: true
    lineItemId?: true
    fileName?: true
    fileType?: true
    fileUrl?: true
    uploadedBy?: true
    description?: true
    createdAt?: true
  }

  export type FileAttachmentMaxAggregateInputType = {
    id?: true
    lineItemId?: true
    fileName?: true
    fileType?: true
    fileUrl?: true
    uploadedBy?: true
    description?: true
    createdAt?: true
  }

  export type FileAttachmentCountAggregateInputType = {
    id?: true
    lineItemId?: true
    fileName?: true
    fileType?: true
    fileUrl?: true
    uploadedBy?: true
    description?: true
    createdAt?: true
    _all?: true
  }

  export type FileAttachmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FileAttachment to aggregate.
     */
    where?: FileAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FileAttachments to fetch.
     */
    orderBy?: FileAttachmentOrderByWithRelationInput | FileAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FileAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FileAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FileAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FileAttachments
    **/
    _count?: true | FileAttachmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FileAttachmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FileAttachmentMaxAggregateInputType
  }

  export type GetFileAttachmentAggregateType<T extends FileAttachmentAggregateArgs> = {
        [P in keyof T & keyof AggregateFileAttachment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFileAttachment[P]>
      : GetScalarType<T[P], AggregateFileAttachment[P]>
  }




  export type FileAttachmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FileAttachmentWhereInput
    orderBy?: FileAttachmentOrderByWithAggregationInput | FileAttachmentOrderByWithAggregationInput[]
    by: FileAttachmentScalarFieldEnum[] | FileAttachmentScalarFieldEnum
    having?: FileAttachmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FileAttachmentCountAggregateInputType | true
    _min?: FileAttachmentMinAggregateInputType
    _max?: FileAttachmentMaxAggregateInputType
  }

  export type FileAttachmentGroupByOutputType = {
    id: string
    lineItemId: string
    fileName: string
    fileType: string
    fileUrl: string
    uploadedBy: string
    description: string | null
    createdAt: Date
    _count: FileAttachmentCountAggregateOutputType | null
    _min: FileAttachmentMinAggregateOutputType | null
    _max: FileAttachmentMaxAggregateOutputType | null
  }

  type GetFileAttachmentGroupByPayload<T extends FileAttachmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FileAttachmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FileAttachmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FileAttachmentGroupByOutputType[P]>
            : GetScalarType<T[P], FileAttachmentGroupByOutputType[P]>
        }
      >
    >


  export type FileAttachmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    lineItemId?: boolean
    fileName?: boolean
    fileType?: boolean
    fileUrl?: boolean
    uploadedBy?: boolean
    description?: boolean
    createdAt?: boolean
    lineItem?: boolean | OrderLineItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fileAttachment"]>

  export type FileAttachmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    lineItemId?: boolean
    fileName?: boolean
    fileType?: boolean
    fileUrl?: boolean
    uploadedBy?: boolean
    description?: boolean
    createdAt?: boolean
    lineItem?: boolean | OrderLineItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fileAttachment"]>

  export type FileAttachmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    lineItemId?: boolean
    fileName?: boolean
    fileType?: boolean
    fileUrl?: boolean
    uploadedBy?: boolean
    description?: boolean
    createdAt?: boolean
    lineItem?: boolean | OrderLineItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fileAttachment"]>

  export type FileAttachmentSelectScalar = {
    id?: boolean
    lineItemId?: boolean
    fileName?: boolean
    fileType?: boolean
    fileUrl?: boolean
    uploadedBy?: boolean
    description?: boolean
    createdAt?: boolean
  }

  export type FileAttachmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "lineItemId" | "fileName" | "fileType" | "fileUrl" | "uploadedBy" | "description" | "createdAt", ExtArgs["result"]["fileAttachment"]>
  export type FileAttachmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lineItem?: boolean | OrderLineItemDefaultArgs<ExtArgs>
  }
  export type FileAttachmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lineItem?: boolean | OrderLineItemDefaultArgs<ExtArgs>
  }
  export type FileAttachmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lineItem?: boolean | OrderLineItemDefaultArgs<ExtArgs>
  }

  export type $FileAttachmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FileAttachment"
    objects: {
      lineItem: Prisma.$OrderLineItemPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      lineItemId: string
      fileName: string
      fileType: string
      fileUrl: string
      uploadedBy: string
      description: string | null
      createdAt: Date
    }, ExtArgs["result"]["fileAttachment"]>
    composites: {}
  }

  type FileAttachmentGetPayload<S extends boolean | null | undefined | FileAttachmentDefaultArgs> = $Result.GetResult<Prisma.$FileAttachmentPayload, S>

  type FileAttachmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FileAttachmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FileAttachmentCountAggregateInputType | true
    }

  export interface FileAttachmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FileAttachment'], meta: { name: 'FileAttachment' } }
    /**
     * Find zero or one FileAttachment that matches the filter.
     * @param {FileAttachmentFindUniqueArgs} args - Arguments to find a FileAttachment
     * @example
     * // Get one FileAttachment
     * const fileAttachment = await prisma.fileAttachment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FileAttachmentFindUniqueArgs>(args: SelectSubset<T, FileAttachmentFindUniqueArgs<ExtArgs>>): Prisma__FileAttachmentClient<$Result.GetResult<Prisma.$FileAttachmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FileAttachment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FileAttachmentFindUniqueOrThrowArgs} args - Arguments to find a FileAttachment
     * @example
     * // Get one FileAttachment
     * const fileAttachment = await prisma.fileAttachment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FileAttachmentFindUniqueOrThrowArgs>(args: SelectSubset<T, FileAttachmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FileAttachmentClient<$Result.GetResult<Prisma.$FileAttachmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FileAttachment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileAttachmentFindFirstArgs} args - Arguments to find a FileAttachment
     * @example
     * // Get one FileAttachment
     * const fileAttachment = await prisma.fileAttachment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FileAttachmentFindFirstArgs>(args?: SelectSubset<T, FileAttachmentFindFirstArgs<ExtArgs>>): Prisma__FileAttachmentClient<$Result.GetResult<Prisma.$FileAttachmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FileAttachment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileAttachmentFindFirstOrThrowArgs} args - Arguments to find a FileAttachment
     * @example
     * // Get one FileAttachment
     * const fileAttachment = await prisma.fileAttachment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FileAttachmentFindFirstOrThrowArgs>(args?: SelectSubset<T, FileAttachmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__FileAttachmentClient<$Result.GetResult<Prisma.$FileAttachmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FileAttachments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileAttachmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FileAttachments
     * const fileAttachments = await prisma.fileAttachment.findMany()
     * 
     * // Get first 10 FileAttachments
     * const fileAttachments = await prisma.fileAttachment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fileAttachmentWithIdOnly = await prisma.fileAttachment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FileAttachmentFindManyArgs>(args?: SelectSubset<T, FileAttachmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FileAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FileAttachment.
     * @param {FileAttachmentCreateArgs} args - Arguments to create a FileAttachment.
     * @example
     * // Create one FileAttachment
     * const FileAttachment = await prisma.fileAttachment.create({
     *   data: {
     *     // ... data to create a FileAttachment
     *   }
     * })
     * 
     */
    create<T extends FileAttachmentCreateArgs>(args: SelectSubset<T, FileAttachmentCreateArgs<ExtArgs>>): Prisma__FileAttachmentClient<$Result.GetResult<Prisma.$FileAttachmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FileAttachments.
     * @param {FileAttachmentCreateManyArgs} args - Arguments to create many FileAttachments.
     * @example
     * // Create many FileAttachments
     * const fileAttachment = await prisma.fileAttachment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FileAttachmentCreateManyArgs>(args?: SelectSubset<T, FileAttachmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FileAttachments and returns the data saved in the database.
     * @param {FileAttachmentCreateManyAndReturnArgs} args - Arguments to create many FileAttachments.
     * @example
     * // Create many FileAttachments
     * const fileAttachment = await prisma.fileAttachment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FileAttachments and only return the `id`
     * const fileAttachmentWithIdOnly = await prisma.fileAttachment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FileAttachmentCreateManyAndReturnArgs>(args?: SelectSubset<T, FileAttachmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FileAttachmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FileAttachment.
     * @param {FileAttachmentDeleteArgs} args - Arguments to delete one FileAttachment.
     * @example
     * // Delete one FileAttachment
     * const FileAttachment = await prisma.fileAttachment.delete({
     *   where: {
     *     // ... filter to delete one FileAttachment
     *   }
     * })
     * 
     */
    delete<T extends FileAttachmentDeleteArgs>(args: SelectSubset<T, FileAttachmentDeleteArgs<ExtArgs>>): Prisma__FileAttachmentClient<$Result.GetResult<Prisma.$FileAttachmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FileAttachment.
     * @param {FileAttachmentUpdateArgs} args - Arguments to update one FileAttachment.
     * @example
     * // Update one FileAttachment
     * const fileAttachment = await prisma.fileAttachment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FileAttachmentUpdateArgs>(args: SelectSubset<T, FileAttachmentUpdateArgs<ExtArgs>>): Prisma__FileAttachmentClient<$Result.GetResult<Prisma.$FileAttachmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FileAttachments.
     * @param {FileAttachmentDeleteManyArgs} args - Arguments to filter FileAttachments to delete.
     * @example
     * // Delete a few FileAttachments
     * const { count } = await prisma.fileAttachment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FileAttachmentDeleteManyArgs>(args?: SelectSubset<T, FileAttachmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FileAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileAttachmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FileAttachments
     * const fileAttachment = await prisma.fileAttachment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FileAttachmentUpdateManyArgs>(args: SelectSubset<T, FileAttachmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FileAttachments and returns the data updated in the database.
     * @param {FileAttachmentUpdateManyAndReturnArgs} args - Arguments to update many FileAttachments.
     * @example
     * // Update many FileAttachments
     * const fileAttachment = await prisma.fileAttachment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FileAttachments and only return the `id`
     * const fileAttachmentWithIdOnly = await prisma.fileAttachment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FileAttachmentUpdateManyAndReturnArgs>(args: SelectSubset<T, FileAttachmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FileAttachmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FileAttachment.
     * @param {FileAttachmentUpsertArgs} args - Arguments to update or create a FileAttachment.
     * @example
     * // Update or create a FileAttachment
     * const fileAttachment = await prisma.fileAttachment.upsert({
     *   create: {
     *     // ... data to create a FileAttachment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FileAttachment we want to update
     *   }
     * })
     */
    upsert<T extends FileAttachmentUpsertArgs>(args: SelectSubset<T, FileAttachmentUpsertArgs<ExtArgs>>): Prisma__FileAttachmentClient<$Result.GetResult<Prisma.$FileAttachmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FileAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileAttachmentCountArgs} args - Arguments to filter FileAttachments to count.
     * @example
     * // Count the number of FileAttachments
     * const count = await prisma.fileAttachment.count({
     *   where: {
     *     // ... the filter for the FileAttachments we want to count
     *   }
     * })
    **/
    count<T extends FileAttachmentCountArgs>(
      args?: Subset<T, FileAttachmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FileAttachmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FileAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileAttachmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FileAttachmentAggregateArgs>(args: Subset<T, FileAttachmentAggregateArgs>): Prisma.PrismaPromise<GetFileAttachmentAggregateType<T>>

    /**
     * Group by FileAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileAttachmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FileAttachmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FileAttachmentGroupByArgs['orderBy'] }
        : { orderBy?: FileAttachmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FileAttachmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFileAttachmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FileAttachment model
   */
  readonly fields: FileAttachmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FileAttachment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FileAttachmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lineItem<T extends OrderLineItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderLineItemDefaultArgs<ExtArgs>>): Prisma__OrderLineItemClient<$Result.GetResult<Prisma.$OrderLineItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FileAttachment model
   */
  interface FileAttachmentFieldRefs {
    readonly id: FieldRef<"FileAttachment", 'String'>
    readonly lineItemId: FieldRef<"FileAttachment", 'String'>
    readonly fileName: FieldRef<"FileAttachment", 'String'>
    readonly fileType: FieldRef<"FileAttachment", 'String'>
    readonly fileUrl: FieldRef<"FileAttachment", 'String'>
    readonly uploadedBy: FieldRef<"FileAttachment", 'String'>
    readonly description: FieldRef<"FileAttachment", 'String'>
    readonly createdAt: FieldRef<"FileAttachment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FileAttachment findUnique
   */
  export type FileAttachmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileAttachment
     */
    select?: FileAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileAttachment
     */
    omit?: FileAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which FileAttachment to fetch.
     */
    where: FileAttachmentWhereUniqueInput
  }

  /**
   * FileAttachment findUniqueOrThrow
   */
  export type FileAttachmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileAttachment
     */
    select?: FileAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileAttachment
     */
    omit?: FileAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which FileAttachment to fetch.
     */
    where: FileAttachmentWhereUniqueInput
  }

  /**
   * FileAttachment findFirst
   */
  export type FileAttachmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileAttachment
     */
    select?: FileAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileAttachment
     */
    omit?: FileAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which FileAttachment to fetch.
     */
    where?: FileAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FileAttachments to fetch.
     */
    orderBy?: FileAttachmentOrderByWithRelationInput | FileAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FileAttachments.
     */
    cursor?: FileAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FileAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FileAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FileAttachments.
     */
    distinct?: FileAttachmentScalarFieldEnum | FileAttachmentScalarFieldEnum[]
  }

  /**
   * FileAttachment findFirstOrThrow
   */
  export type FileAttachmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileAttachment
     */
    select?: FileAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileAttachment
     */
    omit?: FileAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which FileAttachment to fetch.
     */
    where?: FileAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FileAttachments to fetch.
     */
    orderBy?: FileAttachmentOrderByWithRelationInput | FileAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FileAttachments.
     */
    cursor?: FileAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FileAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FileAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FileAttachments.
     */
    distinct?: FileAttachmentScalarFieldEnum | FileAttachmentScalarFieldEnum[]
  }

  /**
   * FileAttachment findMany
   */
  export type FileAttachmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileAttachment
     */
    select?: FileAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileAttachment
     */
    omit?: FileAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which FileAttachments to fetch.
     */
    where?: FileAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FileAttachments to fetch.
     */
    orderBy?: FileAttachmentOrderByWithRelationInput | FileAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FileAttachments.
     */
    cursor?: FileAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FileAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FileAttachments.
     */
    skip?: number
    distinct?: FileAttachmentScalarFieldEnum | FileAttachmentScalarFieldEnum[]
  }

  /**
   * FileAttachment create
   */
  export type FileAttachmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileAttachment
     */
    select?: FileAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileAttachment
     */
    omit?: FileAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileAttachmentInclude<ExtArgs> | null
    /**
     * The data needed to create a FileAttachment.
     */
    data: XOR<FileAttachmentCreateInput, FileAttachmentUncheckedCreateInput>
  }

  /**
   * FileAttachment createMany
   */
  export type FileAttachmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FileAttachments.
     */
    data: FileAttachmentCreateManyInput | FileAttachmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FileAttachment createManyAndReturn
   */
  export type FileAttachmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileAttachment
     */
    select?: FileAttachmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FileAttachment
     */
    omit?: FileAttachmentOmit<ExtArgs> | null
    /**
     * The data used to create many FileAttachments.
     */
    data: FileAttachmentCreateManyInput | FileAttachmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileAttachmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FileAttachment update
   */
  export type FileAttachmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileAttachment
     */
    select?: FileAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileAttachment
     */
    omit?: FileAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileAttachmentInclude<ExtArgs> | null
    /**
     * The data needed to update a FileAttachment.
     */
    data: XOR<FileAttachmentUpdateInput, FileAttachmentUncheckedUpdateInput>
    /**
     * Choose, which FileAttachment to update.
     */
    where: FileAttachmentWhereUniqueInput
  }

  /**
   * FileAttachment updateMany
   */
  export type FileAttachmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FileAttachments.
     */
    data: XOR<FileAttachmentUpdateManyMutationInput, FileAttachmentUncheckedUpdateManyInput>
    /**
     * Filter which FileAttachments to update
     */
    where?: FileAttachmentWhereInput
    /**
     * Limit how many FileAttachments to update.
     */
    limit?: number
  }

  /**
   * FileAttachment updateManyAndReturn
   */
  export type FileAttachmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileAttachment
     */
    select?: FileAttachmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FileAttachment
     */
    omit?: FileAttachmentOmit<ExtArgs> | null
    /**
     * The data used to update FileAttachments.
     */
    data: XOR<FileAttachmentUpdateManyMutationInput, FileAttachmentUncheckedUpdateManyInput>
    /**
     * Filter which FileAttachments to update
     */
    where?: FileAttachmentWhereInput
    /**
     * Limit how many FileAttachments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileAttachmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FileAttachment upsert
   */
  export type FileAttachmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileAttachment
     */
    select?: FileAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileAttachment
     */
    omit?: FileAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileAttachmentInclude<ExtArgs> | null
    /**
     * The filter to search for the FileAttachment to update in case it exists.
     */
    where: FileAttachmentWhereUniqueInput
    /**
     * In case the FileAttachment found by the `where` argument doesn't exist, create a new FileAttachment with this data.
     */
    create: XOR<FileAttachmentCreateInput, FileAttachmentUncheckedCreateInput>
    /**
     * In case the FileAttachment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FileAttachmentUpdateInput, FileAttachmentUncheckedUpdateInput>
  }

  /**
   * FileAttachment delete
   */
  export type FileAttachmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileAttachment
     */
    select?: FileAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileAttachment
     */
    omit?: FileAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileAttachmentInclude<ExtArgs> | null
    /**
     * Filter which FileAttachment to delete.
     */
    where: FileAttachmentWhereUniqueInput
  }

  /**
   * FileAttachment deleteMany
   */
  export type FileAttachmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FileAttachments to delete
     */
    where?: FileAttachmentWhereInput
    /**
     * Limit how many FileAttachments to delete.
     */
    limit?: number
  }

  /**
   * FileAttachment without action
   */
  export type FileAttachmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileAttachment
     */
    select?: FileAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileAttachment
     */
    omit?: FileAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileAttachmentInclude<ExtArgs> | null
  }


  /**
   * Model Batch
   */

  export type AggregateBatch = {
    _count: BatchCountAggregateOutputType | null
    _avg: BatchAvgAggregateOutputType | null
    _sum: BatchSumAggregateOutputType | null
    _min: BatchMinAggregateOutputType | null
    _max: BatchMaxAggregateOutputType | null
  }

  export type BatchAvgAggregateOutputType = {
    quantity: number | null
  }

  export type BatchSumAggregateOutputType = {
    quantity: number | null
  }

  export type BatchMinAggregateOutputType = {
    id: string | null
    batchId: string | null
    lineItemId: string | null
    quantity: number | null
    startDate: Date | null
    estimatedCompletion: Date | null
    actualCompletion: Date | null
    priority: $Enums.BatchPriority | null
    status: $Enums.BatchStatus | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BatchMaxAggregateOutputType = {
    id: string | null
    batchId: string | null
    lineItemId: string | null
    quantity: number | null
    startDate: Date | null
    estimatedCompletion: Date | null
    actualCompletion: Date | null
    priority: $Enums.BatchPriority | null
    status: $Enums.BatchStatus | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BatchCountAggregateOutputType = {
    id: number
    batchId: number
    lineItemId: number
    quantity: number
    startDate: number
    estimatedCompletion: number
    actualCompletion: number
    priority: number
    status: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BatchAvgAggregateInputType = {
    quantity?: true
  }

  export type BatchSumAggregateInputType = {
    quantity?: true
  }

  export type BatchMinAggregateInputType = {
    id?: true
    batchId?: true
    lineItemId?: true
    quantity?: true
    startDate?: true
    estimatedCompletion?: true
    actualCompletion?: true
    priority?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BatchMaxAggregateInputType = {
    id?: true
    batchId?: true
    lineItemId?: true
    quantity?: true
    startDate?: true
    estimatedCompletion?: true
    actualCompletion?: true
    priority?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BatchCountAggregateInputType = {
    id?: true
    batchId?: true
    lineItemId?: true
    quantity?: true
    startDate?: true
    estimatedCompletion?: true
    actualCompletion?: true
    priority?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BatchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Batch to aggregate.
     */
    where?: BatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Batches to fetch.
     */
    orderBy?: BatchOrderByWithRelationInput | BatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Batches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Batches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Batches
    **/
    _count?: true | BatchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BatchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BatchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BatchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BatchMaxAggregateInputType
  }

  export type GetBatchAggregateType<T extends BatchAggregateArgs> = {
        [P in keyof T & keyof AggregateBatch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBatch[P]>
      : GetScalarType<T[P], AggregateBatch[P]>
  }




  export type BatchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BatchWhereInput
    orderBy?: BatchOrderByWithAggregationInput | BatchOrderByWithAggregationInput[]
    by: BatchScalarFieldEnum[] | BatchScalarFieldEnum
    having?: BatchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BatchCountAggregateInputType | true
    _avg?: BatchAvgAggregateInputType
    _sum?: BatchSumAggregateInputType
    _min?: BatchMinAggregateInputType
    _max?: BatchMaxAggregateInputType
  }

  export type BatchGroupByOutputType = {
    id: string
    batchId: string
    lineItemId: string
    quantity: number
    startDate: Date | null
    estimatedCompletion: Date | null
    actualCompletion: Date | null
    priority: $Enums.BatchPriority
    status: $Enums.BatchStatus
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: BatchCountAggregateOutputType | null
    _avg: BatchAvgAggregateOutputType | null
    _sum: BatchSumAggregateOutputType | null
    _min: BatchMinAggregateOutputType | null
    _max: BatchMaxAggregateOutputType | null
  }

  type GetBatchGroupByPayload<T extends BatchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BatchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BatchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BatchGroupByOutputType[P]>
            : GetScalarType<T[P], BatchGroupByOutputType[P]>
        }
      >
    >


  export type BatchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    batchId?: boolean
    lineItemId?: boolean
    quantity?: boolean
    startDate?: boolean
    estimatedCompletion?: boolean
    actualCompletion?: boolean
    priority?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lineItem?: boolean | OrderLineItemDefaultArgs<ExtArgs>
    routingSteps?: boolean | Batch$routingStepsArgs<ExtArgs>
    qcRecords?: boolean | Batch$qcRecordsArgs<ExtArgs>
    _count?: boolean | BatchCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["batch"]>

  export type BatchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    batchId?: boolean
    lineItemId?: boolean
    quantity?: boolean
    startDate?: boolean
    estimatedCompletion?: boolean
    actualCompletion?: boolean
    priority?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lineItem?: boolean | OrderLineItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["batch"]>

  export type BatchSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    batchId?: boolean
    lineItemId?: boolean
    quantity?: boolean
    startDate?: boolean
    estimatedCompletion?: boolean
    actualCompletion?: boolean
    priority?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lineItem?: boolean | OrderLineItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["batch"]>

  export type BatchSelectScalar = {
    id?: boolean
    batchId?: boolean
    lineItemId?: boolean
    quantity?: boolean
    startDate?: boolean
    estimatedCompletion?: boolean
    actualCompletion?: boolean
    priority?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BatchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "batchId" | "lineItemId" | "quantity" | "startDate" | "estimatedCompletion" | "actualCompletion" | "priority" | "status" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["batch"]>
  export type BatchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lineItem?: boolean | OrderLineItemDefaultArgs<ExtArgs>
    routingSteps?: boolean | Batch$routingStepsArgs<ExtArgs>
    qcRecords?: boolean | Batch$qcRecordsArgs<ExtArgs>
    _count?: boolean | BatchCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BatchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lineItem?: boolean | OrderLineItemDefaultArgs<ExtArgs>
  }
  export type BatchIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lineItem?: boolean | OrderLineItemDefaultArgs<ExtArgs>
  }

  export type $BatchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Batch"
    objects: {
      lineItem: Prisma.$OrderLineItemPayload<ExtArgs>
      routingSteps: Prisma.$RoutingStepPayload<ExtArgs>[]
      qcRecords: Prisma.$QCRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      batchId: string
      lineItemId: string
      quantity: number
      startDate: Date | null
      estimatedCompletion: Date | null
      actualCompletion: Date | null
      priority: $Enums.BatchPriority
      status: $Enums.BatchStatus
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["batch"]>
    composites: {}
  }

  type BatchGetPayload<S extends boolean | null | undefined | BatchDefaultArgs> = $Result.GetResult<Prisma.$BatchPayload, S>

  type BatchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BatchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BatchCountAggregateInputType | true
    }

  export interface BatchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Batch'], meta: { name: 'Batch' } }
    /**
     * Find zero or one Batch that matches the filter.
     * @param {BatchFindUniqueArgs} args - Arguments to find a Batch
     * @example
     * // Get one Batch
     * const batch = await prisma.batch.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BatchFindUniqueArgs>(args: SelectSubset<T, BatchFindUniqueArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Batch that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BatchFindUniqueOrThrowArgs} args - Arguments to find a Batch
     * @example
     * // Get one Batch
     * const batch = await prisma.batch.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BatchFindUniqueOrThrowArgs>(args: SelectSubset<T, BatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Batch that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchFindFirstArgs} args - Arguments to find a Batch
     * @example
     * // Get one Batch
     * const batch = await prisma.batch.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BatchFindFirstArgs>(args?: SelectSubset<T, BatchFindFirstArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Batch that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchFindFirstOrThrowArgs} args - Arguments to find a Batch
     * @example
     * // Get one Batch
     * const batch = await prisma.batch.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BatchFindFirstOrThrowArgs>(args?: SelectSubset<T, BatchFindFirstOrThrowArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Batches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Batches
     * const batches = await prisma.batch.findMany()
     * 
     * // Get first 10 Batches
     * const batches = await prisma.batch.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const batchWithIdOnly = await prisma.batch.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BatchFindManyArgs>(args?: SelectSubset<T, BatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Batch.
     * @param {BatchCreateArgs} args - Arguments to create a Batch.
     * @example
     * // Create one Batch
     * const Batch = await prisma.batch.create({
     *   data: {
     *     // ... data to create a Batch
     *   }
     * })
     * 
     */
    create<T extends BatchCreateArgs>(args: SelectSubset<T, BatchCreateArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Batches.
     * @param {BatchCreateManyArgs} args - Arguments to create many Batches.
     * @example
     * // Create many Batches
     * const batch = await prisma.batch.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BatchCreateManyArgs>(args?: SelectSubset<T, BatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Batches and returns the data saved in the database.
     * @param {BatchCreateManyAndReturnArgs} args - Arguments to create many Batches.
     * @example
     * // Create many Batches
     * const batch = await prisma.batch.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Batches and only return the `id`
     * const batchWithIdOnly = await prisma.batch.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BatchCreateManyAndReturnArgs>(args?: SelectSubset<T, BatchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Batch.
     * @param {BatchDeleteArgs} args - Arguments to delete one Batch.
     * @example
     * // Delete one Batch
     * const Batch = await prisma.batch.delete({
     *   where: {
     *     // ... filter to delete one Batch
     *   }
     * })
     * 
     */
    delete<T extends BatchDeleteArgs>(args: SelectSubset<T, BatchDeleteArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Batch.
     * @param {BatchUpdateArgs} args - Arguments to update one Batch.
     * @example
     * // Update one Batch
     * const batch = await prisma.batch.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BatchUpdateArgs>(args: SelectSubset<T, BatchUpdateArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Batches.
     * @param {BatchDeleteManyArgs} args - Arguments to filter Batches to delete.
     * @example
     * // Delete a few Batches
     * const { count } = await prisma.batch.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BatchDeleteManyArgs>(args?: SelectSubset<T, BatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Batches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Batches
     * const batch = await prisma.batch.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BatchUpdateManyArgs>(args: SelectSubset<T, BatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Batches and returns the data updated in the database.
     * @param {BatchUpdateManyAndReturnArgs} args - Arguments to update many Batches.
     * @example
     * // Update many Batches
     * const batch = await prisma.batch.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Batches and only return the `id`
     * const batchWithIdOnly = await prisma.batch.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BatchUpdateManyAndReturnArgs>(args: SelectSubset<T, BatchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Batch.
     * @param {BatchUpsertArgs} args - Arguments to update or create a Batch.
     * @example
     * // Update or create a Batch
     * const batch = await prisma.batch.upsert({
     *   create: {
     *     // ... data to create a Batch
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Batch we want to update
     *   }
     * })
     */
    upsert<T extends BatchUpsertArgs>(args: SelectSubset<T, BatchUpsertArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Batches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchCountArgs} args - Arguments to filter Batches to count.
     * @example
     * // Count the number of Batches
     * const count = await prisma.batch.count({
     *   where: {
     *     // ... the filter for the Batches we want to count
     *   }
     * })
    **/
    count<T extends BatchCountArgs>(
      args?: Subset<T, BatchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BatchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Batch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BatchAggregateArgs>(args: Subset<T, BatchAggregateArgs>): Prisma.PrismaPromise<GetBatchAggregateType<T>>

    /**
     * Group by Batch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BatchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BatchGroupByArgs['orderBy'] }
        : { orderBy?: BatchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Batch model
   */
  readonly fields: BatchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Batch.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BatchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lineItem<T extends OrderLineItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderLineItemDefaultArgs<ExtArgs>>): Prisma__OrderLineItemClient<$Result.GetResult<Prisma.$OrderLineItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    routingSteps<T extends Batch$routingStepsArgs<ExtArgs> = {}>(args?: Subset<T, Batch$routingStepsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutingStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    qcRecords<T extends Batch$qcRecordsArgs<ExtArgs> = {}>(args?: Subset<T, Batch$qcRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QCRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Batch model
   */
  interface BatchFieldRefs {
    readonly id: FieldRef<"Batch", 'String'>
    readonly batchId: FieldRef<"Batch", 'String'>
    readonly lineItemId: FieldRef<"Batch", 'String'>
    readonly quantity: FieldRef<"Batch", 'Int'>
    readonly startDate: FieldRef<"Batch", 'DateTime'>
    readonly estimatedCompletion: FieldRef<"Batch", 'DateTime'>
    readonly actualCompletion: FieldRef<"Batch", 'DateTime'>
    readonly priority: FieldRef<"Batch", 'BatchPriority'>
    readonly status: FieldRef<"Batch", 'BatchStatus'>
    readonly notes: FieldRef<"Batch", 'String'>
    readonly createdAt: FieldRef<"Batch", 'DateTime'>
    readonly updatedAt: FieldRef<"Batch", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Batch findUnique
   */
  export type BatchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter, which Batch to fetch.
     */
    where: BatchWhereUniqueInput
  }

  /**
   * Batch findUniqueOrThrow
   */
  export type BatchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter, which Batch to fetch.
     */
    where: BatchWhereUniqueInput
  }

  /**
   * Batch findFirst
   */
  export type BatchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter, which Batch to fetch.
     */
    where?: BatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Batches to fetch.
     */
    orderBy?: BatchOrderByWithRelationInput | BatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Batches.
     */
    cursor?: BatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Batches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Batches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Batches.
     */
    distinct?: BatchScalarFieldEnum | BatchScalarFieldEnum[]
  }

  /**
   * Batch findFirstOrThrow
   */
  export type BatchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter, which Batch to fetch.
     */
    where?: BatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Batches to fetch.
     */
    orderBy?: BatchOrderByWithRelationInput | BatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Batches.
     */
    cursor?: BatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Batches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Batches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Batches.
     */
    distinct?: BatchScalarFieldEnum | BatchScalarFieldEnum[]
  }

  /**
   * Batch findMany
   */
  export type BatchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter, which Batches to fetch.
     */
    where?: BatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Batches to fetch.
     */
    orderBy?: BatchOrderByWithRelationInput | BatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Batches.
     */
    cursor?: BatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Batches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Batches.
     */
    skip?: number
    distinct?: BatchScalarFieldEnum | BatchScalarFieldEnum[]
  }

  /**
   * Batch create
   */
  export type BatchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * The data needed to create a Batch.
     */
    data: XOR<BatchCreateInput, BatchUncheckedCreateInput>
  }

  /**
   * Batch createMany
   */
  export type BatchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Batches.
     */
    data: BatchCreateManyInput | BatchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Batch createManyAndReturn
   */
  export type BatchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * The data used to create many Batches.
     */
    data: BatchCreateManyInput | BatchCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Batch update
   */
  export type BatchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * The data needed to update a Batch.
     */
    data: XOR<BatchUpdateInput, BatchUncheckedUpdateInput>
    /**
     * Choose, which Batch to update.
     */
    where: BatchWhereUniqueInput
  }

  /**
   * Batch updateMany
   */
  export type BatchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Batches.
     */
    data: XOR<BatchUpdateManyMutationInput, BatchUncheckedUpdateManyInput>
    /**
     * Filter which Batches to update
     */
    where?: BatchWhereInput
    /**
     * Limit how many Batches to update.
     */
    limit?: number
  }

  /**
   * Batch updateManyAndReturn
   */
  export type BatchUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * The data used to update Batches.
     */
    data: XOR<BatchUpdateManyMutationInput, BatchUncheckedUpdateManyInput>
    /**
     * Filter which Batches to update
     */
    where?: BatchWhereInput
    /**
     * Limit how many Batches to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Batch upsert
   */
  export type BatchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * The filter to search for the Batch to update in case it exists.
     */
    where: BatchWhereUniqueInput
    /**
     * In case the Batch found by the `where` argument doesn't exist, create a new Batch with this data.
     */
    create: XOR<BatchCreateInput, BatchUncheckedCreateInput>
    /**
     * In case the Batch was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BatchUpdateInput, BatchUncheckedUpdateInput>
  }

  /**
   * Batch delete
   */
  export type BatchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter which Batch to delete.
     */
    where: BatchWhereUniqueInput
  }

  /**
   * Batch deleteMany
   */
  export type BatchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Batches to delete
     */
    where?: BatchWhereInput
    /**
     * Limit how many Batches to delete.
     */
    limit?: number
  }

  /**
   * Batch.routingSteps
   */
  export type Batch$routingStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingStep
     */
    select?: RoutingStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoutingStep
     */
    omit?: RoutingStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingStepInclude<ExtArgs> | null
    where?: RoutingStepWhereInput
    orderBy?: RoutingStepOrderByWithRelationInput | RoutingStepOrderByWithRelationInput[]
    cursor?: RoutingStepWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoutingStepScalarFieldEnum | RoutingStepScalarFieldEnum[]
  }

  /**
   * Batch.qcRecords
   */
  export type Batch$qcRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QCRecord
     */
    select?: QCRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QCRecord
     */
    omit?: QCRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QCRecordInclude<ExtArgs> | null
    where?: QCRecordWhereInput
    orderBy?: QCRecordOrderByWithRelationInput | QCRecordOrderByWithRelationInput[]
    cursor?: QCRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QCRecordScalarFieldEnum | QCRecordScalarFieldEnum[]
  }

  /**
   * Batch without action
   */
  export type BatchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
  }


  /**
   * Model RoutingStep
   */

  export type AggregateRoutingStep = {
    _count: RoutingStepCountAggregateOutputType | null
    _avg: RoutingStepAvgAggregateOutputType | null
    _sum: RoutingStepSumAggregateOutputType | null
    _min: RoutingStepMinAggregateOutputType | null
    _max: RoutingStepMaxAggregateOutputType | null
  }

  export type RoutingStepAvgAggregateOutputType = {
    stepNumber: number | null
    estimatedTime: number | null
  }

  export type RoutingStepSumAggregateOutputType = {
    stepNumber: number | null
    estimatedTime: number | null
  }

  export type RoutingStepMinAggregateOutputType = {
    id: string | null
    batchId: string | null
    stepNumber: number | null
    workstationId: string | null
    description: string | null
    required: boolean | null
    estimatedTime: number | null
    notes: string | null
    status: $Enums.StepStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoutingStepMaxAggregateOutputType = {
    id: string | null
    batchId: string | null
    stepNumber: number | null
    workstationId: string | null
    description: string | null
    required: boolean | null
    estimatedTime: number | null
    notes: string | null
    status: $Enums.StepStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoutingStepCountAggregateOutputType = {
    id: number
    batchId: number
    stepNumber: number
    workstationId: number
    description: number
    required: number
    estimatedTime: number
    notes: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoutingStepAvgAggregateInputType = {
    stepNumber?: true
    estimatedTime?: true
  }

  export type RoutingStepSumAggregateInputType = {
    stepNumber?: true
    estimatedTime?: true
  }

  export type RoutingStepMinAggregateInputType = {
    id?: true
    batchId?: true
    stepNumber?: true
    workstationId?: true
    description?: true
    required?: true
    estimatedTime?: true
    notes?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoutingStepMaxAggregateInputType = {
    id?: true
    batchId?: true
    stepNumber?: true
    workstationId?: true
    description?: true
    required?: true
    estimatedTime?: true
    notes?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoutingStepCountAggregateInputType = {
    id?: true
    batchId?: true
    stepNumber?: true
    workstationId?: true
    description?: true
    required?: true
    estimatedTime?: true
    notes?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoutingStepAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoutingStep to aggregate.
     */
    where?: RoutingStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoutingSteps to fetch.
     */
    orderBy?: RoutingStepOrderByWithRelationInput | RoutingStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoutingStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoutingSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoutingSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoutingSteps
    **/
    _count?: true | RoutingStepCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoutingStepAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoutingStepSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoutingStepMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoutingStepMaxAggregateInputType
  }

  export type GetRoutingStepAggregateType<T extends RoutingStepAggregateArgs> = {
        [P in keyof T & keyof AggregateRoutingStep]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoutingStep[P]>
      : GetScalarType<T[P], AggregateRoutingStep[P]>
  }




  export type RoutingStepGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoutingStepWhereInput
    orderBy?: RoutingStepOrderByWithAggregationInput | RoutingStepOrderByWithAggregationInput[]
    by: RoutingStepScalarFieldEnum[] | RoutingStepScalarFieldEnum
    having?: RoutingStepScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoutingStepCountAggregateInputType | true
    _avg?: RoutingStepAvgAggregateInputType
    _sum?: RoutingStepSumAggregateInputType
    _min?: RoutingStepMinAggregateInputType
    _max?: RoutingStepMaxAggregateInputType
  }

  export type RoutingStepGroupByOutputType = {
    id: string
    batchId: string
    stepNumber: number
    workstationId: string
    description: string
    required: boolean
    estimatedTime: number | null
    notes: string | null
    status: $Enums.StepStatus
    createdAt: Date
    updatedAt: Date
    _count: RoutingStepCountAggregateOutputType | null
    _avg: RoutingStepAvgAggregateOutputType | null
    _sum: RoutingStepSumAggregateOutputType | null
    _min: RoutingStepMinAggregateOutputType | null
    _max: RoutingStepMaxAggregateOutputType | null
  }

  type GetRoutingStepGroupByPayload<T extends RoutingStepGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoutingStepGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoutingStepGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoutingStepGroupByOutputType[P]>
            : GetScalarType<T[P], RoutingStepGroupByOutputType[P]>
        }
      >
    >


  export type RoutingStepSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    batchId?: boolean
    stepNumber?: boolean
    workstationId?: boolean
    description?: boolean
    required?: boolean
    estimatedTime?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    workstation?: boolean | WorkstationDefaultArgs<ExtArgs>
    confirmations?: boolean | RoutingStep$confirmationsArgs<ExtArgs>
    _count?: boolean | RoutingStepCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["routingStep"]>

  export type RoutingStepSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    batchId?: boolean
    stepNumber?: boolean
    workstationId?: boolean
    description?: boolean
    required?: boolean
    estimatedTime?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    workstation?: boolean | WorkstationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["routingStep"]>

  export type RoutingStepSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    batchId?: boolean
    stepNumber?: boolean
    workstationId?: boolean
    description?: boolean
    required?: boolean
    estimatedTime?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    workstation?: boolean | WorkstationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["routingStep"]>

  export type RoutingStepSelectScalar = {
    id?: boolean
    batchId?: boolean
    stepNumber?: boolean
    workstationId?: boolean
    description?: boolean
    required?: boolean
    estimatedTime?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoutingStepOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "batchId" | "stepNumber" | "workstationId" | "description" | "required" | "estimatedTime" | "notes" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["routingStep"]>
  export type RoutingStepInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    workstation?: boolean | WorkstationDefaultArgs<ExtArgs>
    confirmations?: boolean | RoutingStep$confirmationsArgs<ExtArgs>
    _count?: boolean | RoutingStepCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoutingStepIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    workstation?: boolean | WorkstationDefaultArgs<ExtArgs>
  }
  export type RoutingStepIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    workstation?: boolean | WorkstationDefaultArgs<ExtArgs>
  }

  export type $RoutingStepPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoutingStep"
    objects: {
      batch: Prisma.$BatchPayload<ExtArgs>
      workstation: Prisma.$WorkstationPayload<ExtArgs>
      confirmations: Prisma.$StepConfirmationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      batchId: string
      stepNumber: number
      workstationId: string
      description: string
      required: boolean
      estimatedTime: number | null
      notes: string | null
      status: $Enums.StepStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["routingStep"]>
    composites: {}
  }

  type RoutingStepGetPayload<S extends boolean | null | undefined | RoutingStepDefaultArgs> = $Result.GetResult<Prisma.$RoutingStepPayload, S>

  type RoutingStepCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoutingStepFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoutingStepCountAggregateInputType | true
    }

  export interface RoutingStepDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoutingStep'], meta: { name: 'RoutingStep' } }
    /**
     * Find zero or one RoutingStep that matches the filter.
     * @param {RoutingStepFindUniqueArgs} args - Arguments to find a RoutingStep
     * @example
     * // Get one RoutingStep
     * const routingStep = await prisma.routingStep.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoutingStepFindUniqueArgs>(args: SelectSubset<T, RoutingStepFindUniqueArgs<ExtArgs>>): Prisma__RoutingStepClient<$Result.GetResult<Prisma.$RoutingStepPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RoutingStep that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoutingStepFindUniqueOrThrowArgs} args - Arguments to find a RoutingStep
     * @example
     * // Get one RoutingStep
     * const routingStep = await prisma.routingStep.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoutingStepFindUniqueOrThrowArgs>(args: SelectSubset<T, RoutingStepFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoutingStepClient<$Result.GetResult<Prisma.$RoutingStepPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoutingStep that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutingStepFindFirstArgs} args - Arguments to find a RoutingStep
     * @example
     * // Get one RoutingStep
     * const routingStep = await prisma.routingStep.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoutingStepFindFirstArgs>(args?: SelectSubset<T, RoutingStepFindFirstArgs<ExtArgs>>): Prisma__RoutingStepClient<$Result.GetResult<Prisma.$RoutingStepPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoutingStep that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutingStepFindFirstOrThrowArgs} args - Arguments to find a RoutingStep
     * @example
     * // Get one RoutingStep
     * const routingStep = await prisma.routingStep.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoutingStepFindFirstOrThrowArgs>(args?: SelectSubset<T, RoutingStepFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoutingStepClient<$Result.GetResult<Prisma.$RoutingStepPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RoutingSteps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutingStepFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoutingSteps
     * const routingSteps = await prisma.routingStep.findMany()
     * 
     * // Get first 10 RoutingSteps
     * const routingSteps = await prisma.routingStep.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const routingStepWithIdOnly = await prisma.routingStep.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoutingStepFindManyArgs>(args?: SelectSubset<T, RoutingStepFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutingStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RoutingStep.
     * @param {RoutingStepCreateArgs} args - Arguments to create a RoutingStep.
     * @example
     * // Create one RoutingStep
     * const RoutingStep = await prisma.routingStep.create({
     *   data: {
     *     // ... data to create a RoutingStep
     *   }
     * })
     * 
     */
    create<T extends RoutingStepCreateArgs>(args: SelectSubset<T, RoutingStepCreateArgs<ExtArgs>>): Prisma__RoutingStepClient<$Result.GetResult<Prisma.$RoutingStepPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RoutingSteps.
     * @param {RoutingStepCreateManyArgs} args - Arguments to create many RoutingSteps.
     * @example
     * // Create many RoutingSteps
     * const routingStep = await prisma.routingStep.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoutingStepCreateManyArgs>(args?: SelectSubset<T, RoutingStepCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoutingSteps and returns the data saved in the database.
     * @param {RoutingStepCreateManyAndReturnArgs} args - Arguments to create many RoutingSteps.
     * @example
     * // Create many RoutingSteps
     * const routingStep = await prisma.routingStep.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoutingSteps and only return the `id`
     * const routingStepWithIdOnly = await prisma.routingStep.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoutingStepCreateManyAndReturnArgs>(args?: SelectSubset<T, RoutingStepCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutingStepPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RoutingStep.
     * @param {RoutingStepDeleteArgs} args - Arguments to delete one RoutingStep.
     * @example
     * // Delete one RoutingStep
     * const RoutingStep = await prisma.routingStep.delete({
     *   where: {
     *     // ... filter to delete one RoutingStep
     *   }
     * })
     * 
     */
    delete<T extends RoutingStepDeleteArgs>(args: SelectSubset<T, RoutingStepDeleteArgs<ExtArgs>>): Prisma__RoutingStepClient<$Result.GetResult<Prisma.$RoutingStepPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RoutingStep.
     * @param {RoutingStepUpdateArgs} args - Arguments to update one RoutingStep.
     * @example
     * // Update one RoutingStep
     * const routingStep = await prisma.routingStep.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoutingStepUpdateArgs>(args: SelectSubset<T, RoutingStepUpdateArgs<ExtArgs>>): Prisma__RoutingStepClient<$Result.GetResult<Prisma.$RoutingStepPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RoutingSteps.
     * @param {RoutingStepDeleteManyArgs} args - Arguments to filter RoutingSteps to delete.
     * @example
     * // Delete a few RoutingSteps
     * const { count } = await prisma.routingStep.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoutingStepDeleteManyArgs>(args?: SelectSubset<T, RoutingStepDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoutingSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutingStepUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoutingSteps
     * const routingStep = await prisma.routingStep.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoutingStepUpdateManyArgs>(args: SelectSubset<T, RoutingStepUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoutingSteps and returns the data updated in the database.
     * @param {RoutingStepUpdateManyAndReturnArgs} args - Arguments to update many RoutingSteps.
     * @example
     * // Update many RoutingSteps
     * const routingStep = await prisma.routingStep.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RoutingSteps and only return the `id`
     * const routingStepWithIdOnly = await prisma.routingStep.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoutingStepUpdateManyAndReturnArgs>(args: SelectSubset<T, RoutingStepUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutingStepPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RoutingStep.
     * @param {RoutingStepUpsertArgs} args - Arguments to update or create a RoutingStep.
     * @example
     * // Update or create a RoutingStep
     * const routingStep = await prisma.routingStep.upsert({
     *   create: {
     *     // ... data to create a RoutingStep
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoutingStep we want to update
     *   }
     * })
     */
    upsert<T extends RoutingStepUpsertArgs>(args: SelectSubset<T, RoutingStepUpsertArgs<ExtArgs>>): Prisma__RoutingStepClient<$Result.GetResult<Prisma.$RoutingStepPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RoutingSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutingStepCountArgs} args - Arguments to filter RoutingSteps to count.
     * @example
     * // Count the number of RoutingSteps
     * const count = await prisma.routingStep.count({
     *   where: {
     *     // ... the filter for the RoutingSteps we want to count
     *   }
     * })
    **/
    count<T extends RoutingStepCountArgs>(
      args?: Subset<T, RoutingStepCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoutingStepCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoutingStep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutingStepAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoutingStepAggregateArgs>(args: Subset<T, RoutingStepAggregateArgs>): Prisma.PrismaPromise<GetRoutingStepAggregateType<T>>

    /**
     * Group by RoutingStep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutingStepGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoutingStepGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoutingStepGroupByArgs['orderBy'] }
        : { orderBy?: RoutingStepGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoutingStepGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoutingStepGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoutingStep model
   */
  readonly fields: RoutingStepFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoutingStep.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoutingStepClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    batch<T extends BatchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BatchDefaultArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    workstation<T extends WorkstationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkstationDefaultArgs<ExtArgs>>): Prisma__WorkstationClient<$Result.GetResult<Prisma.$WorkstationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    confirmations<T extends RoutingStep$confirmationsArgs<ExtArgs> = {}>(args?: Subset<T, RoutingStep$confirmationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StepConfirmationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RoutingStep model
   */
  interface RoutingStepFieldRefs {
    readonly id: FieldRef<"RoutingStep", 'String'>
    readonly batchId: FieldRef<"RoutingStep", 'String'>
    readonly stepNumber: FieldRef<"RoutingStep", 'Int'>
    readonly workstationId: FieldRef<"RoutingStep", 'String'>
    readonly description: FieldRef<"RoutingStep", 'String'>
    readonly required: FieldRef<"RoutingStep", 'Boolean'>
    readonly estimatedTime: FieldRef<"RoutingStep", 'Int'>
    readonly notes: FieldRef<"RoutingStep", 'String'>
    readonly status: FieldRef<"RoutingStep", 'StepStatus'>
    readonly createdAt: FieldRef<"RoutingStep", 'DateTime'>
    readonly updatedAt: FieldRef<"RoutingStep", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RoutingStep findUnique
   */
  export type RoutingStepFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingStep
     */
    select?: RoutingStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoutingStep
     */
    omit?: RoutingStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingStepInclude<ExtArgs> | null
    /**
     * Filter, which RoutingStep to fetch.
     */
    where: RoutingStepWhereUniqueInput
  }

  /**
   * RoutingStep findUniqueOrThrow
   */
  export type RoutingStepFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingStep
     */
    select?: RoutingStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoutingStep
     */
    omit?: RoutingStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingStepInclude<ExtArgs> | null
    /**
     * Filter, which RoutingStep to fetch.
     */
    where: RoutingStepWhereUniqueInput
  }

  /**
   * RoutingStep findFirst
   */
  export type RoutingStepFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingStep
     */
    select?: RoutingStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoutingStep
     */
    omit?: RoutingStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingStepInclude<ExtArgs> | null
    /**
     * Filter, which RoutingStep to fetch.
     */
    where?: RoutingStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoutingSteps to fetch.
     */
    orderBy?: RoutingStepOrderByWithRelationInput | RoutingStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoutingSteps.
     */
    cursor?: RoutingStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoutingSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoutingSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoutingSteps.
     */
    distinct?: RoutingStepScalarFieldEnum | RoutingStepScalarFieldEnum[]
  }

  /**
   * RoutingStep findFirstOrThrow
   */
  export type RoutingStepFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingStep
     */
    select?: RoutingStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoutingStep
     */
    omit?: RoutingStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingStepInclude<ExtArgs> | null
    /**
     * Filter, which RoutingStep to fetch.
     */
    where?: RoutingStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoutingSteps to fetch.
     */
    orderBy?: RoutingStepOrderByWithRelationInput | RoutingStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoutingSteps.
     */
    cursor?: RoutingStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoutingSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoutingSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoutingSteps.
     */
    distinct?: RoutingStepScalarFieldEnum | RoutingStepScalarFieldEnum[]
  }

  /**
   * RoutingStep findMany
   */
  export type RoutingStepFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingStep
     */
    select?: RoutingStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoutingStep
     */
    omit?: RoutingStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingStepInclude<ExtArgs> | null
    /**
     * Filter, which RoutingSteps to fetch.
     */
    where?: RoutingStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoutingSteps to fetch.
     */
    orderBy?: RoutingStepOrderByWithRelationInput | RoutingStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoutingSteps.
     */
    cursor?: RoutingStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoutingSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoutingSteps.
     */
    skip?: number
    distinct?: RoutingStepScalarFieldEnum | RoutingStepScalarFieldEnum[]
  }

  /**
   * RoutingStep create
   */
  export type RoutingStepCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingStep
     */
    select?: RoutingStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoutingStep
     */
    omit?: RoutingStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingStepInclude<ExtArgs> | null
    /**
     * The data needed to create a RoutingStep.
     */
    data: XOR<RoutingStepCreateInput, RoutingStepUncheckedCreateInput>
  }

  /**
   * RoutingStep createMany
   */
  export type RoutingStepCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoutingSteps.
     */
    data: RoutingStepCreateManyInput | RoutingStepCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoutingStep createManyAndReturn
   */
  export type RoutingStepCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingStep
     */
    select?: RoutingStepSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoutingStep
     */
    omit?: RoutingStepOmit<ExtArgs> | null
    /**
     * The data used to create many RoutingSteps.
     */
    data: RoutingStepCreateManyInput | RoutingStepCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingStepIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoutingStep update
   */
  export type RoutingStepUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingStep
     */
    select?: RoutingStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoutingStep
     */
    omit?: RoutingStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingStepInclude<ExtArgs> | null
    /**
     * The data needed to update a RoutingStep.
     */
    data: XOR<RoutingStepUpdateInput, RoutingStepUncheckedUpdateInput>
    /**
     * Choose, which RoutingStep to update.
     */
    where: RoutingStepWhereUniqueInput
  }

  /**
   * RoutingStep updateMany
   */
  export type RoutingStepUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoutingSteps.
     */
    data: XOR<RoutingStepUpdateManyMutationInput, RoutingStepUncheckedUpdateManyInput>
    /**
     * Filter which RoutingSteps to update
     */
    where?: RoutingStepWhereInput
    /**
     * Limit how many RoutingSteps to update.
     */
    limit?: number
  }

  /**
   * RoutingStep updateManyAndReturn
   */
  export type RoutingStepUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingStep
     */
    select?: RoutingStepSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoutingStep
     */
    omit?: RoutingStepOmit<ExtArgs> | null
    /**
     * The data used to update RoutingSteps.
     */
    data: XOR<RoutingStepUpdateManyMutationInput, RoutingStepUncheckedUpdateManyInput>
    /**
     * Filter which RoutingSteps to update
     */
    where?: RoutingStepWhereInput
    /**
     * Limit how many RoutingSteps to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingStepIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoutingStep upsert
   */
  export type RoutingStepUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingStep
     */
    select?: RoutingStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoutingStep
     */
    omit?: RoutingStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingStepInclude<ExtArgs> | null
    /**
     * The filter to search for the RoutingStep to update in case it exists.
     */
    where: RoutingStepWhereUniqueInput
    /**
     * In case the RoutingStep found by the `where` argument doesn't exist, create a new RoutingStep with this data.
     */
    create: XOR<RoutingStepCreateInput, RoutingStepUncheckedCreateInput>
    /**
     * In case the RoutingStep was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoutingStepUpdateInput, RoutingStepUncheckedUpdateInput>
  }

  /**
   * RoutingStep delete
   */
  export type RoutingStepDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingStep
     */
    select?: RoutingStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoutingStep
     */
    omit?: RoutingStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingStepInclude<ExtArgs> | null
    /**
     * Filter which RoutingStep to delete.
     */
    where: RoutingStepWhereUniqueInput
  }

  /**
   * RoutingStep deleteMany
   */
  export type RoutingStepDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoutingSteps to delete
     */
    where?: RoutingStepWhereInput
    /**
     * Limit how many RoutingSteps to delete.
     */
    limit?: number
  }

  /**
   * RoutingStep.confirmations
   */
  export type RoutingStep$confirmationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepConfirmation
     */
    select?: StepConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepConfirmation
     */
    omit?: StepConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepConfirmationInclude<ExtArgs> | null
    where?: StepConfirmationWhereInput
    orderBy?: StepConfirmationOrderByWithRelationInput | StepConfirmationOrderByWithRelationInput[]
    cursor?: StepConfirmationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StepConfirmationScalarFieldEnum | StepConfirmationScalarFieldEnum[]
  }

  /**
   * RoutingStep without action
   */
  export type RoutingStepDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingStep
     */
    select?: RoutingStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoutingStep
     */
    omit?: RoutingStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingStepInclude<ExtArgs> | null
  }


  /**
   * Model Workstation
   */

  export type AggregateWorkstation = {
    _count: WorkstationCountAggregateOutputType | null
    _min: WorkstationMinAggregateOutputType | null
    _max: WorkstationMaxAggregateOutputType | null
  }

  export type WorkstationMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkstationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkstationCountAggregateOutputType = {
    id: number
    name: number
    description: number
    active: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WorkstationMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkstationMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkstationCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WorkstationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Workstation to aggregate.
     */
    where?: WorkstationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workstations to fetch.
     */
    orderBy?: WorkstationOrderByWithRelationInput | WorkstationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkstationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workstations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workstations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Workstations
    **/
    _count?: true | WorkstationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkstationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkstationMaxAggregateInputType
  }

  export type GetWorkstationAggregateType<T extends WorkstationAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkstation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkstation[P]>
      : GetScalarType<T[P], AggregateWorkstation[P]>
  }




  export type WorkstationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkstationWhereInput
    orderBy?: WorkstationOrderByWithAggregationInput | WorkstationOrderByWithAggregationInput[]
    by: WorkstationScalarFieldEnum[] | WorkstationScalarFieldEnum
    having?: WorkstationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkstationCountAggregateInputType | true
    _min?: WorkstationMinAggregateInputType
    _max?: WorkstationMaxAggregateInputType
  }

  export type WorkstationGroupByOutputType = {
    id: string
    name: string
    description: string | null
    active: boolean
    createdAt: Date
    updatedAt: Date
    _count: WorkstationCountAggregateOutputType | null
    _min: WorkstationMinAggregateOutputType | null
    _max: WorkstationMaxAggregateOutputType | null
  }

  type GetWorkstationGroupByPayload<T extends WorkstationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkstationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkstationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkstationGroupByOutputType[P]>
            : GetScalarType<T[P], WorkstationGroupByOutputType[P]>
        }
      >
    >


  export type WorkstationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    routingSteps?: boolean | Workstation$routingStepsArgs<ExtArgs>
    confirmations?: boolean | Workstation$confirmationsArgs<ExtArgs>
    _count?: boolean | WorkstationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workstation"]>

  export type WorkstationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["workstation"]>

  export type WorkstationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["workstation"]>

  export type WorkstationSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WorkstationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["workstation"]>
  export type WorkstationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    routingSteps?: boolean | Workstation$routingStepsArgs<ExtArgs>
    confirmations?: boolean | Workstation$confirmationsArgs<ExtArgs>
    _count?: boolean | WorkstationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WorkstationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type WorkstationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $WorkstationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Workstation"
    objects: {
      routingSteps: Prisma.$RoutingStepPayload<ExtArgs>[]
      confirmations: Prisma.$StepConfirmationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      active: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["workstation"]>
    composites: {}
  }

  type WorkstationGetPayload<S extends boolean | null | undefined | WorkstationDefaultArgs> = $Result.GetResult<Prisma.$WorkstationPayload, S>

  type WorkstationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkstationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkstationCountAggregateInputType | true
    }

  export interface WorkstationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Workstation'], meta: { name: 'Workstation' } }
    /**
     * Find zero or one Workstation that matches the filter.
     * @param {WorkstationFindUniqueArgs} args - Arguments to find a Workstation
     * @example
     * // Get one Workstation
     * const workstation = await prisma.workstation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkstationFindUniqueArgs>(args: SelectSubset<T, WorkstationFindUniqueArgs<ExtArgs>>): Prisma__WorkstationClient<$Result.GetResult<Prisma.$WorkstationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Workstation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkstationFindUniqueOrThrowArgs} args - Arguments to find a Workstation
     * @example
     * // Get one Workstation
     * const workstation = await prisma.workstation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkstationFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkstationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkstationClient<$Result.GetResult<Prisma.$WorkstationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Workstation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkstationFindFirstArgs} args - Arguments to find a Workstation
     * @example
     * // Get one Workstation
     * const workstation = await prisma.workstation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkstationFindFirstArgs>(args?: SelectSubset<T, WorkstationFindFirstArgs<ExtArgs>>): Prisma__WorkstationClient<$Result.GetResult<Prisma.$WorkstationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Workstation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkstationFindFirstOrThrowArgs} args - Arguments to find a Workstation
     * @example
     * // Get one Workstation
     * const workstation = await prisma.workstation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkstationFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkstationFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkstationClient<$Result.GetResult<Prisma.$WorkstationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Workstations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkstationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Workstations
     * const workstations = await prisma.workstation.findMany()
     * 
     * // Get first 10 Workstations
     * const workstations = await prisma.workstation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workstationWithIdOnly = await prisma.workstation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkstationFindManyArgs>(args?: SelectSubset<T, WorkstationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkstationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Workstation.
     * @param {WorkstationCreateArgs} args - Arguments to create a Workstation.
     * @example
     * // Create one Workstation
     * const Workstation = await prisma.workstation.create({
     *   data: {
     *     // ... data to create a Workstation
     *   }
     * })
     * 
     */
    create<T extends WorkstationCreateArgs>(args: SelectSubset<T, WorkstationCreateArgs<ExtArgs>>): Prisma__WorkstationClient<$Result.GetResult<Prisma.$WorkstationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Workstations.
     * @param {WorkstationCreateManyArgs} args - Arguments to create many Workstations.
     * @example
     * // Create many Workstations
     * const workstation = await prisma.workstation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkstationCreateManyArgs>(args?: SelectSubset<T, WorkstationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Workstations and returns the data saved in the database.
     * @param {WorkstationCreateManyAndReturnArgs} args - Arguments to create many Workstations.
     * @example
     * // Create many Workstations
     * const workstation = await prisma.workstation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Workstations and only return the `id`
     * const workstationWithIdOnly = await prisma.workstation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkstationCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkstationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkstationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Workstation.
     * @param {WorkstationDeleteArgs} args - Arguments to delete one Workstation.
     * @example
     * // Delete one Workstation
     * const Workstation = await prisma.workstation.delete({
     *   where: {
     *     // ... filter to delete one Workstation
     *   }
     * })
     * 
     */
    delete<T extends WorkstationDeleteArgs>(args: SelectSubset<T, WorkstationDeleteArgs<ExtArgs>>): Prisma__WorkstationClient<$Result.GetResult<Prisma.$WorkstationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Workstation.
     * @param {WorkstationUpdateArgs} args - Arguments to update one Workstation.
     * @example
     * // Update one Workstation
     * const workstation = await prisma.workstation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkstationUpdateArgs>(args: SelectSubset<T, WorkstationUpdateArgs<ExtArgs>>): Prisma__WorkstationClient<$Result.GetResult<Prisma.$WorkstationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Workstations.
     * @param {WorkstationDeleteManyArgs} args - Arguments to filter Workstations to delete.
     * @example
     * // Delete a few Workstations
     * const { count } = await prisma.workstation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkstationDeleteManyArgs>(args?: SelectSubset<T, WorkstationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Workstations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkstationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Workstations
     * const workstation = await prisma.workstation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkstationUpdateManyArgs>(args: SelectSubset<T, WorkstationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Workstations and returns the data updated in the database.
     * @param {WorkstationUpdateManyAndReturnArgs} args - Arguments to update many Workstations.
     * @example
     * // Update many Workstations
     * const workstation = await prisma.workstation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Workstations and only return the `id`
     * const workstationWithIdOnly = await prisma.workstation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkstationUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkstationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkstationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Workstation.
     * @param {WorkstationUpsertArgs} args - Arguments to update or create a Workstation.
     * @example
     * // Update or create a Workstation
     * const workstation = await prisma.workstation.upsert({
     *   create: {
     *     // ... data to create a Workstation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Workstation we want to update
     *   }
     * })
     */
    upsert<T extends WorkstationUpsertArgs>(args: SelectSubset<T, WorkstationUpsertArgs<ExtArgs>>): Prisma__WorkstationClient<$Result.GetResult<Prisma.$WorkstationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Workstations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkstationCountArgs} args - Arguments to filter Workstations to count.
     * @example
     * // Count the number of Workstations
     * const count = await prisma.workstation.count({
     *   where: {
     *     // ... the filter for the Workstations we want to count
     *   }
     * })
    **/
    count<T extends WorkstationCountArgs>(
      args?: Subset<T, WorkstationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkstationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Workstation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkstationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkstationAggregateArgs>(args: Subset<T, WorkstationAggregateArgs>): Prisma.PrismaPromise<GetWorkstationAggregateType<T>>

    /**
     * Group by Workstation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkstationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkstationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkstationGroupByArgs['orderBy'] }
        : { orderBy?: WorkstationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkstationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkstationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Workstation model
   */
  readonly fields: WorkstationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Workstation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkstationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    routingSteps<T extends Workstation$routingStepsArgs<ExtArgs> = {}>(args?: Subset<T, Workstation$routingStepsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutingStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    confirmations<T extends Workstation$confirmationsArgs<ExtArgs> = {}>(args?: Subset<T, Workstation$confirmationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StepConfirmationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Workstation model
   */
  interface WorkstationFieldRefs {
    readonly id: FieldRef<"Workstation", 'String'>
    readonly name: FieldRef<"Workstation", 'String'>
    readonly description: FieldRef<"Workstation", 'String'>
    readonly active: FieldRef<"Workstation", 'Boolean'>
    readonly createdAt: FieldRef<"Workstation", 'DateTime'>
    readonly updatedAt: FieldRef<"Workstation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Workstation findUnique
   */
  export type WorkstationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workstation
     */
    select?: WorkstationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workstation
     */
    omit?: WorkstationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkstationInclude<ExtArgs> | null
    /**
     * Filter, which Workstation to fetch.
     */
    where: WorkstationWhereUniqueInput
  }

  /**
   * Workstation findUniqueOrThrow
   */
  export type WorkstationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workstation
     */
    select?: WorkstationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workstation
     */
    omit?: WorkstationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkstationInclude<ExtArgs> | null
    /**
     * Filter, which Workstation to fetch.
     */
    where: WorkstationWhereUniqueInput
  }

  /**
   * Workstation findFirst
   */
  export type WorkstationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workstation
     */
    select?: WorkstationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workstation
     */
    omit?: WorkstationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkstationInclude<ExtArgs> | null
    /**
     * Filter, which Workstation to fetch.
     */
    where?: WorkstationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workstations to fetch.
     */
    orderBy?: WorkstationOrderByWithRelationInput | WorkstationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Workstations.
     */
    cursor?: WorkstationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workstations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workstations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workstations.
     */
    distinct?: WorkstationScalarFieldEnum | WorkstationScalarFieldEnum[]
  }

  /**
   * Workstation findFirstOrThrow
   */
  export type WorkstationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workstation
     */
    select?: WorkstationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workstation
     */
    omit?: WorkstationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkstationInclude<ExtArgs> | null
    /**
     * Filter, which Workstation to fetch.
     */
    where?: WorkstationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workstations to fetch.
     */
    orderBy?: WorkstationOrderByWithRelationInput | WorkstationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Workstations.
     */
    cursor?: WorkstationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workstations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workstations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workstations.
     */
    distinct?: WorkstationScalarFieldEnum | WorkstationScalarFieldEnum[]
  }

  /**
   * Workstation findMany
   */
  export type WorkstationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workstation
     */
    select?: WorkstationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workstation
     */
    omit?: WorkstationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkstationInclude<ExtArgs> | null
    /**
     * Filter, which Workstations to fetch.
     */
    where?: WorkstationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workstations to fetch.
     */
    orderBy?: WorkstationOrderByWithRelationInput | WorkstationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Workstations.
     */
    cursor?: WorkstationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workstations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workstations.
     */
    skip?: number
    distinct?: WorkstationScalarFieldEnum | WorkstationScalarFieldEnum[]
  }

  /**
   * Workstation create
   */
  export type WorkstationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workstation
     */
    select?: WorkstationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workstation
     */
    omit?: WorkstationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkstationInclude<ExtArgs> | null
    /**
     * The data needed to create a Workstation.
     */
    data: XOR<WorkstationCreateInput, WorkstationUncheckedCreateInput>
  }

  /**
   * Workstation createMany
   */
  export type WorkstationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Workstations.
     */
    data: WorkstationCreateManyInput | WorkstationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Workstation createManyAndReturn
   */
  export type WorkstationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workstation
     */
    select?: WorkstationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Workstation
     */
    omit?: WorkstationOmit<ExtArgs> | null
    /**
     * The data used to create many Workstations.
     */
    data: WorkstationCreateManyInput | WorkstationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Workstation update
   */
  export type WorkstationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workstation
     */
    select?: WorkstationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workstation
     */
    omit?: WorkstationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkstationInclude<ExtArgs> | null
    /**
     * The data needed to update a Workstation.
     */
    data: XOR<WorkstationUpdateInput, WorkstationUncheckedUpdateInput>
    /**
     * Choose, which Workstation to update.
     */
    where: WorkstationWhereUniqueInput
  }

  /**
   * Workstation updateMany
   */
  export type WorkstationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Workstations.
     */
    data: XOR<WorkstationUpdateManyMutationInput, WorkstationUncheckedUpdateManyInput>
    /**
     * Filter which Workstations to update
     */
    where?: WorkstationWhereInput
    /**
     * Limit how many Workstations to update.
     */
    limit?: number
  }

  /**
   * Workstation updateManyAndReturn
   */
  export type WorkstationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workstation
     */
    select?: WorkstationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Workstation
     */
    omit?: WorkstationOmit<ExtArgs> | null
    /**
     * The data used to update Workstations.
     */
    data: XOR<WorkstationUpdateManyMutationInput, WorkstationUncheckedUpdateManyInput>
    /**
     * Filter which Workstations to update
     */
    where?: WorkstationWhereInput
    /**
     * Limit how many Workstations to update.
     */
    limit?: number
  }

  /**
   * Workstation upsert
   */
  export type WorkstationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workstation
     */
    select?: WorkstationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workstation
     */
    omit?: WorkstationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkstationInclude<ExtArgs> | null
    /**
     * The filter to search for the Workstation to update in case it exists.
     */
    where: WorkstationWhereUniqueInput
    /**
     * In case the Workstation found by the `where` argument doesn't exist, create a new Workstation with this data.
     */
    create: XOR<WorkstationCreateInput, WorkstationUncheckedCreateInput>
    /**
     * In case the Workstation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkstationUpdateInput, WorkstationUncheckedUpdateInput>
  }

  /**
   * Workstation delete
   */
  export type WorkstationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workstation
     */
    select?: WorkstationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workstation
     */
    omit?: WorkstationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkstationInclude<ExtArgs> | null
    /**
     * Filter which Workstation to delete.
     */
    where: WorkstationWhereUniqueInput
  }

  /**
   * Workstation deleteMany
   */
  export type WorkstationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Workstations to delete
     */
    where?: WorkstationWhereInput
    /**
     * Limit how many Workstations to delete.
     */
    limit?: number
  }

  /**
   * Workstation.routingSteps
   */
  export type Workstation$routingStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingStep
     */
    select?: RoutingStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoutingStep
     */
    omit?: RoutingStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingStepInclude<ExtArgs> | null
    where?: RoutingStepWhereInput
    orderBy?: RoutingStepOrderByWithRelationInput | RoutingStepOrderByWithRelationInput[]
    cursor?: RoutingStepWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoutingStepScalarFieldEnum | RoutingStepScalarFieldEnum[]
  }

  /**
   * Workstation.confirmations
   */
  export type Workstation$confirmationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepConfirmation
     */
    select?: StepConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepConfirmation
     */
    omit?: StepConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepConfirmationInclude<ExtArgs> | null
    where?: StepConfirmationWhereInput
    orderBy?: StepConfirmationOrderByWithRelationInput | StepConfirmationOrderByWithRelationInput[]
    cursor?: StepConfirmationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StepConfirmationScalarFieldEnum | StepConfirmationScalarFieldEnum[]
  }

  /**
   * Workstation without action
   */
  export type WorkstationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workstation
     */
    select?: WorkstationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workstation
     */
    omit?: WorkstationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkstationInclude<ExtArgs> | null
  }


  /**
   * Model StepConfirmation
   */

  export type AggregateStepConfirmation = {
    _count: StepConfirmationCountAggregateOutputType | null
    _min: StepConfirmationMinAggregateOutputType | null
    _max: StepConfirmationMaxAggregateOutputType | null
  }

  export type StepConfirmationMinAggregateOutputType = {
    id: string | null
    stepId: string | null
    workstationId: string | null
    operatorName: string | null
    operatorId: string | null
    startTime: Date | null
    endTime: Date | null
    notes: string | null
    photoUrl: string | null
    flagged: boolean | null
    status: $Enums.ConfirmationStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StepConfirmationMaxAggregateOutputType = {
    id: string | null
    stepId: string | null
    workstationId: string | null
    operatorName: string | null
    operatorId: string | null
    startTime: Date | null
    endTime: Date | null
    notes: string | null
    photoUrl: string | null
    flagged: boolean | null
    status: $Enums.ConfirmationStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StepConfirmationCountAggregateOutputType = {
    id: number
    stepId: number
    workstationId: number
    operatorName: number
    operatorId: number
    startTime: number
    endTime: number
    notes: number
    photoUrl: number
    flagged: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StepConfirmationMinAggregateInputType = {
    id?: true
    stepId?: true
    workstationId?: true
    operatorName?: true
    operatorId?: true
    startTime?: true
    endTime?: true
    notes?: true
    photoUrl?: true
    flagged?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StepConfirmationMaxAggregateInputType = {
    id?: true
    stepId?: true
    workstationId?: true
    operatorName?: true
    operatorId?: true
    startTime?: true
    endTime?: true
    notes?: true
    photoUrl?: true
    flagged?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StepConfirmationCountAggregateInputType = {
    id?: true
    stepId?: true
    workstationId?: true
    operatorName?: true
    operatorId?: true
    startTime?: true
    endTime?: true
    notes?: true
    photoUrl?: true
    flagged?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StepConfirmationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StepConfirmation to aggregate.
     */
    where?: StepConfirmationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StepConfirmations to fetch.
     */
    orderBy?: StepConfirmationOrderByWithRelationInput | StepConfirmationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StepConfirmationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StepConfirmations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StepConfirmations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StepConfirmations
    **/
    _count?: true | StepConfirmationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StepConfirmationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StepConfirmationMaxAggregateInputType
  }

  export type GetStepConfirmationAggregateType<T extends StepConfirmationAggregateArgs> = {
        [P in keyof T & keyof AggregateStepConfirmation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStepConfirmation[P]>
      : GetScalarType<T[P], AggregateStepConfirmation[P]>
  }




  export type StepConfirmationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StepConfirmationWhereInput
    orderBy?: StepConfirmationOrderByWithAggregationInput | StepConfirmationOrderByWithAggregationInput[]
    by: StepConfirmationScalarFieldEnum[] | StepConfirmationScalarFieldEnum
    having?: StepConfirmationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StepConfirmationCountAggregateInputType | true
    _min?: StepConfirmationMinAggregateInputType
    _max?: StepConfirmationMaxAggregateInputType
  }

  export type StepConfirmationGroupByOutputType = {
    id: string
    stepId: string
    workstationId: string
    operatorName: string
    operatorId: string | null
    startTime: Date | null
    endTime: Date | null
    notes: string | null
    photoUrl: string | null
    flagged: boolean
    status: $Enums.ConfirmationStatus
    createdAt: Date
    updatedAt: Date
    _count: StepConfirmationCountAggregateOutputType | null
    _min: StepConfirmationMinAggregateOutputType | null
    _max: StepConfirmationMaxAggregateOutputType | null
  }

  type GetStepConfirmationGroupByPayload<T extends StepConfirmationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StepConfirmationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StepConfirmationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StepConfirmationGroupByOutputType[P]>
            : GetScalarType<T[P], StepConfirmationGroupByOutputType[P]>
        }
      >
    >


  export type StepConfirmationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stepId?: boolean
    workstationId?: boolean
    operatorName?: boolean
    operatorId?: boolean
    startTime?: boolean
    endTime?: boolean
    notes?: boolean
    photoUrl?: boolean
    flagged?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    routingStep?: boolean | RoutingStepDefaultArgs<ExtArgs>
    workstation?: boolean | WorkstationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stepConfirmation"]>

  export type StepConfirmationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stepId?: boolean
    workstationId?: boolean
    operatorName?: boolean
    operatorId?: boolean
    startTime?: boolean
    endTime?: boolean
    notes?: boolean
    photoUrl?: boolean
    flagged?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    routingStep?: boolean | RoutingStepDefaultArgs<ExtArgs>
    workstation?: boolean | WorkstationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stepConfirmation"]>

  export type StepConfirmationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stepId?: boolean
    workstationId?: boolean
    operatorName?: boolean
    operatorId?: boolean
    startTime?: boolean
    endTime?: boolean
    notes?: boolean
    photoUrl?: boolean
    flagged?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    routingStep?: boolean | RoutingStepDefaultArgs<ExtArgs>
    workstation?: boolean | WorkstationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stepConfirmation"]>

  export type StepConfirmationSelectScalar = {
    id?: boolean
    stepId?: boolean
    workstationId?: boolean
    operatorName?: boolean
    operatorId?: boolean
    startTime?: boolean
    endTime?: boolean
    notes?: boolean
    photoUrl?: boolean
    flagged?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StepConfirmationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "stepId" | "workstationId" | "operatorName" | "operatorId" | "startTime" | "endTime" | "notes" | "photoUrl" | "flagged" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["stepConfirmation"]>
  export type StepConfirmationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    routingStep?: boolean | RoutingStepDefaultArgs<ExtArgs>
    workstation?: boolean | WorkstationDefaultArgs<ExtArgs>
  }
  export type StepConfirmationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    routingStep?: boolean | RoutingStepDefaultArgs<ExtArgs>
    workstation?: boolean | WorkstationDefaultArgs<ExtArgs>
  }
  export type StepConfirmationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    routingStep?: boolean | RoutingStepDefaultArgs<ExtArgs>
    workstation?: boolean | WorkstationDefaultArgs<ExtArgs>
  }

  export type $StepConfirmationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StepConfirmation"
    objects: {
      routingStep: Prisma.$RoutingStepPayload<ExtArgs>
      workstation: Prisma.$WorkstationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      stepId: string
      workstationId: string
      operatorName: string
      operatorId: string | null
      startTime: Date | null
      endTime: Date | null
      notes: string | null
      photoUrl: string | null
      flagged: boolean
      status: $Enums.ConfirmationStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["stepConfirmation"]>
    composites: {}
  }

  type StepConfirmationGetPayload<S extends boolean | null | undefined | StepConfirmationDefaultArgs> = $Result.GetResult<Prisma.$StepConfirmationPayload, S>

  type StepConfirmationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StepConfirmationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StepConfirmationCountAggregateInputType | true
    }

  export interface StepConfirmationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StepConfirmation'], meta: { name: 'StepConfirmation' } }
    /**
     * Find zero or one StepConfirmation that matches the filter.
     * @param {StepConfirmationFindUniqueArgs} args - Arguments to find a StepConfirmation
     * @example
     * // Get one StepConfirmation
     * const stepConfirmation = await prisma.stepConfirmation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StepConfirmationFindUniqueArgs>(args: SelectSubset<T, StepConfirmationFindUniqueArgs<ExtArgs>>): Prisma__StepConfirmationClient<$Result.GetResult<Prisma.$StepConfirmationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StepConfirmation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StepConfirmationFindUniqueOrThrowArgs} args - Arguments to find a StepConfirmation
     * @example
     * // Get one StepConfirmation
     * const stepConfirmation = await prisma.stepConfirmation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StepConfirmationFindUniqueOrThrowArgs>(args: SelectSubset<T, StepConfirmationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StepConfirmationClient<$Result.GetResult<Prisma.$StepConfirmationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StepConfirmation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepConfirmationFindFirstArgs} args - Arguments to find a StepConfirmation
     * @example
     * // Get one StepConfirmation
     * const stepConfirmation = await prisma.stepConfirmation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StepConfirmationFindFirstArgs>(args?: SelectSubset<T, StepConfirmationFindFirstArgs<ExtArgs>>): Prisma__StepConfirmationClient<$Result.GetResult<Prisma.$StepConfirmationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StepConfirmation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepConfirmationFindFirstOrThrowArgs} args - Arguments to find a StepConfirmation
     * @example
     * // Get one StepConfirmation
     * const stepConfirmation = await prisma.stepConfirmation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StepConfirmationFindFirstOrThrowArgs>(args?: SelectSubset<T, StepConfirmationFindFirstOrThrowArgs<ExtArgs>>): Prisma__StepConfirmationClient<$Result.GetResult<Prisma.$StepConfirmationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StepConfirmations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepConfirmationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StepConfirmations
     * const stepConfirmations = await prisma.stepConfirmation.findMany()
     * 
     * // Get first 10 StepConfirmations
     * const stepConfirmations = await prisma.stepConfirmation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stepConfirmationWithIdOnly = await prisma.stepConfirmation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StepConfirmationFindManyArgs>(args?: SelectSubset<T, StepConfirmationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StepConfirmationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StepConfirmation.
     * @param {StepConfirmationCreateArgs} args - Arguments to create a StepConfirmation.
     * @example
     * // Create one StepConfirmation
     * const StepConfirmation = await prisma.stepConfirmation.create({
     *   data: {
     *     // ... data to create a StepConfirmation
     *   }
     * })
     * 
     */
    create<T extends StepConfirmationCreateArgs>(args: SelectSubset<T, StepConfirmationCreateArgs<ExtArgs>>): Prisma__StepConfirmationClient<$Result.GetResult<Prisma.$StepConfirmationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StepConfirmations.
     * @param {StepConfirmationCreateManyArgs} args - Arguments to create many StepConfirmations.
     * @example
     * // Create many StepConfirmations
     * const stepConfirmation = await prisma.stepConfirmation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StepConfirmationCreateManyArgs>(args?: SelectSubset<T, StepConfirmationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StepConfirmations and returns the data saved in the database.
     * @param {StepConfirmationCreateManyAndReturnArgs} args - Arguments to create many StepConfirmations.
     * @example
     * // Create many StepConfirmations
     * const stepConfirmation = await prisma.stepConfirmation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StepConfirmations and only return the `id`
     * const stepConfirmationWithIdOnly = await prisma.stepConfirmation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StepConfirmationCreateManyAndReturnArgs>(args?: SelectSubset<T, StepConfirmationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StepConfirmationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StepConfirmation.
     * @param {StepConfirmationDeleteArgs} args - Arguments to delete one StepConfirmation.
     * @example
     * // Delete one StepConfirmation
     * const StepConfirmation = await prisma.stepConfirmation.delete({
     *   where: {
     *     // ... filter to delete one StepConfirmation
     *   }
     * })
     * 
     */
    delete<T extends StepConfirmationDeleteArgs>(args: SelectSubset<T, StepConfirmationDeleteArgs<ExtArgs>>): Prisma__StepConfirmationClient<$Result.GetResult<Prisma.$StepConfirmationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StepConfirmation.
     * @param {StepConfirmationUpdateArgs} args - Arguments to update one StepConfirmation.
     * @example
     * // Update one StepConfirmation
     * const stepConfirmation = await prisma.stepConfirmation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StepConfirmationUpdateArgs>(args: SelectSubset<T, StepConfirmationUpdateArgs<ExtArgs>>): Prisma__StepConfirmationClient<$Result.GetResult<Prisma.$StepConfirmationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StepConfirmations.
     * @param {StepConfirmationDeleteManyArgs} args - Arguments to filter StepConfirmations to delete.
     * @example
     * // Delete a few StepConfirmations
     * const { count } = await prisma.stepConfirmation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StepConfirmationDeleteManyArgs>(args?: SelectSubset<T, StepConfirmationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StepConfirmations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepConfirmationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StepConfirmations
     * const stepConfirmation = await prisma.stepConfirmation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StepConfirmationUpdateManyArgs>(args: SelectSubset<T, StepConfirmationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StepConfirmations and returns the data updated in the database.
     * @param {StepConfirmationUpdateManyAndReturnArgs} args - Arguments to update many StepConfirmations.
     * @example
     * // Update many StepConfirmations
     * const stepConfirmation = await prisma.stepConfirmation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StepConfirmations and only return the `id`
     * const stepConfirmationWithIdOnly = await prisma.stepConfirmation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StepConfirmationUpdateManyAndReturnArgs>(args: SelectSubset<T, StepConfirmationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StepConfirmationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StepConfirmation.
     * @param {StepConfirmationUpsertArgs} args - Arguments to update or create a StepConfirmation.
     * @example
     * // Update or create a StepConfirmation
     * const stepConfirmation = await prisma.stepConfirmation.upsert({
     *   create: {
     *     // ... data to create a StepConfirmation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StepConfirmation we want to update
     *   }
     * })
     */
    upsert<T extends StepConfirmationUpsertArgs>(args: SelectSubset<T, StepConfirmationUpsertArgs<ExtArgs>>): Prisma__StepConfirmationClient<$Result.GetResult<Prisma.$StepConfirmationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StepConfirmations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepConfirmationCountArgs} args - Arguments to filter StepConfirmations to count.
     * @example
     * // Count the number of StepConfirmations
     * const count = await prisma.stepConfirmation.count({
     *   where: {
     *     // ... the filter for the StepConfirmations we want to count
     *   }
     * })
    **/
    count<T extends StepConfirmationCountArgs>(
      args?: Subset<T, StepConfirmationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StepConfirmationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StepConfirmation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepConfirmationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StepConfirmationAggregateArgs>(args: Subset<T, StepConfirmationAggregateArgs>): Prisma.PrismaPromise<GetStepConfirmationAggregateType<T>>

    /**
     * Group by StepConfirmation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepConfirmationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StepConfirmationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StepConfirmationGroupByArgs['orderBy'] }
        : { orderBy?: StepConfirmationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StepConfirmationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStepConfirmationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StepConfirmation model
   */
  readonly fields: StepConfirmationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StepConfirmation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StepConfirmationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    routingStep<T extends RoutingStepDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoutingStepDefaultArgs<ExtArgs>>): Prisma__RoutingStepClient<$Result.GetResult<Prisma.$RoutingStepPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    workstation<T extends WorkstationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkstationDefaultArgs<ExtArgs>>): Prisma__WorkstationClient<$Result.GetResult<Prisma.$WorkstationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StepConfirmation model
   */
  interface StepConfirmationFieldRefs {
    readonly id: FieldRef<"StepConfirmation", 'String'>
    readonly stepId: FieldRef<"StepConfirmation", 'String'>
    readonly workstationId: FieldRef<"StepConfirmation", 'String'>
    readonly operatorName: FieldRef<"StepConfirmation", 'String'>
    readonly operatorId: FieldRef<"StepConfirmation", 'String'>
    readonly startTime: FieldRef<"StepConfirmation", 'DateTime'>
    readonly endTime: FieldRef<"StepConfirmation", 'DateTime'>
    readonly notes: FieldRef<"StepConfirmation", 'String'>
    readonly photoUrl: FieldRef<"StepConfirmation", 'String'>
    readonly flagged: FieldRef<"StepConfirmation", 'Boolean'>
    readonly status: FieldRef<"StepConfirmation", 'ConfirmationStatus'>
    readonly createdAt: FieldRef<"StepConfirmation", 'DateTime'>
    readonly updatedAt: FieldRef<"StepConfirmation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StepConfirmation findUnique
   */
  export type StepConfirmationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepConfirmation
     */
    select?: StepConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepConfirmation
     */
    omit?: StepConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepConfirmationInclude<ExtArgs> | null
    /**
     * Filter, which StepConfirmation to fetch.
     */
    where: StepConfirmationWhereUniqueInput
  }

  /**
   * StepConfirmation findUniqueOrThrow
   */
  export type StepConfirmationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepConfirmation
     */
    select?: StepConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepConfirmation
     */
    omit?: StepConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepConfirmationInclude<ExtArgs> | null
    /**
     * Filter, which StepConfirmation to fetch.
     */
    where: StepConfirmationWhereUniqueInput
  }

  /**
   * StepConfirmation findFirst
   */
  export type StepConfirmationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepConfirmation
     */
    select?: StepConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepConfirmation
     */
    omit?: StepConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepConfirmationInclude<ExtArgs> | null
    /**
     * Filter, which StepConfirmation to fetch.
     */
    where?: StepConfirmationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StepConfirmations to fetch.
     */
    orderBy?: StepConfirmationOrderByWithRelationInput | StepConfirmationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StepConfirmations.
     */
    cursor?: StepConfirmationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StepConfirmations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StepConfirmations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StepConfirmations.
     */
    distinct?: StepConfirmationScalarFieldEnum | StepConfirmationScalarFieldEnum[]
  }

  /**
   * StepConfirmation findFirstOrThrow
   */
  export type StepConfirmationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepConfirmation
     */
    select?: StepConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepConfirmation
     */
    omit?: StepConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepConfirmationInclude<ExtArgs> | null
    /**
     * Filter, which StepConfirmation to fetch.
     */
    where?: StepConfirmationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StepConfirmations to fetch.
     */
    orderBy?: StepConfirmationOrderByWithRelationInput | StepConfirmationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StepConfirmations.
     */
    cursor?: StepConfirmationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StepConfirmations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StepConfirmations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StepConfirmations.
     */
    distinct?: StepConfirmationScalarFieldEnum | StepConfirmationScalarFieldEnum[]
  }

  /**
   * StepConfirmation findMany
   */
  export type StepConfirmationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepConfirmation
     */
    select?: StepConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepConfirmation
     */
    omit?: StepConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepConfirmationInclude<ExtArgs> | null
    /**
     * Filter, which StepConfirmations to fetch.
     */
    where?: StepConfirmationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StepConfirmations to fetch.
     */
    orderBy?: StepConfirmationOrderByWithRelationInput | StepConfirmationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StepConfirmations.
     */
    cursor?: StepConfirmationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StepConfirmations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StepConfirmations.
     */
    skip?: number
    distinct?: StepConfirmationScalarFieldEnum | StepConfirmationScalarFieldEnum[]
  }

  /**
   * StepConfirmation create
   */
  export type StepConfirmationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepConfirmation
     */
    select?: StepConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepConfirmation
     */
    omit?: StepConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepConfirmationInclude<ExtArgs> | null
    /**
     * The data needed to create a StepConfirmation.
     */
    data: XOR<StepConfirmationCreateInput, StepConfirmationUncheckedCreateInput>
  }

  /**
   * StepConfirmation createMany
   */
  export type StepConfirmationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StepConfirmations.
     */
    data: StepConfirmationCreateManyInput | StepConfirmationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StepConfirmation createManyAndReturn
   */
  export type StepConfirmationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepConfirmation
     */
    select?: StepConfirmationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StepConfirmation
     */
    omit?: StepConfirmationOmit<ExtArgs> | null
    /**
     * The data used to create many StepConfirmations.
     */
    data: StepConfirmationCreateManyInput | StepConfirmationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepConfirmationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StepConfirmation update
   */
  export type StepConfirmationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepConfirmation
     */
    select?: StepConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepConfirmation
     */
    omit?: StepConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepConfirmationInclude<ExtArgs> | null
    /**
     * The data needed to update a StepConfirmation.
     */
    data: XOR<StepConfirmationUpdateInput, StepConfirmationUncheckedUpdateInput>
    /**
     * Choose, which StepConfirmation to update.
     */
    where: StepConfirmationWhereUniqueInput
  }

  /**
   * StepConfirmation updateMany
   */
  export type StepConfirmationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StepConfirmations.
     */
    data: XOR<StepConfirmationUpdateManyMutationInput, StepConfirmationUncheckedUpdateManyInput>
    /**
     * Filter which StepConfirmations to update
     */
    where?: StepConfirmationWhereInput
    /**
     * Limit how many StepConfirmations to update.
     */
    limit?: number
  }

  /**
   * StepConfirmation updateManyAndReturn
   */
  export type StepConfirmationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepConfirmation
     */
    select?: StepConfirmationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StepConfirmation
     */
    omit?: StepConfirmationOmit<ExtArgs> | null
    /**
     * The data used to update StepConfirmations.
     */
    data: XOR<StepConfirmationUpdateManyMutationInput, StepConfirmationUncheckedUpdateManyInput>
    /**
     * Filter which StepConfirmations to update
     */
    where?: StepConfirmationWhereInput
    /**
     * Limit how many StepConfirmations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepConfirmationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StepConfirmation upsert
   */
  export type StepConfirmationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepConfirmation
     */
    select?: StepConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepConfirmation
     */
    omit?: StepConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepConfirmationInclude<ExtArgs> | null
    /**
     * The filter to search for the StepConfirmation to update in case it exists.
     */
    where: StepConfirmationWhereUniqueInput
    /**
     * In case the StepConfirmation found by the `where` argument doesn't exist, create a new StepConfirmation with this data.
     */
    create: XOR<StepConfirmationCreateInput, StepConfirmationUncheckedCreateInput>
    /**
     * In case the StepConfirmation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StepConfirmationUpdateInput, StepConfirmationUncheckedUpdateInput>
  }

  /**
   * StepConfirmation delete
   */
  export type StepConfirmationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepConfirmation
     */
    select?: StepConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepConfirmation
     */
    omit?: StepConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepConfirmationInclude<ExtArgs> | null
    /**
     * Filter which StepConfirmation to delete.
     */
    where: StepConfirmationWhereUniqueInput
  }

  /**
   * StepConfirmation deleteMany
   */
  export type StepConfirmationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StepConfirmations to delete
     */
    where?: StepConfirmationWhereInput
    /**
     * Limit how many StepConfirmations to delete.
     */
    limit?: number
  }

  /**
   * StepConfirmation without action
   */
  export type StepConfirmationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StepConfirmation
     */
    select?: StepConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StepConfirmation
     */
    omit?: StepConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepConfirmationInclude<ExtArgs> | null
  }


  /**
   * Model QCRecord
   */

  export type AggregateQCRecord = {
    _count: QCRecordCountAggregateOutputType | null
    _min: QCRecordMinAggregateOutputType | null
    _max: QCRecordMaxAggregateOutputType | null
  }

  export type QCRecordMinAggregateOutputType = {
    id: string | null
    batchId: string | null
    inspector: string | null
    inspectionDate: Date | null
    result: $Enums.QCResult | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QCRecordMaxAggregateOutputType = {
    id: string | null
    batchId: string | null
    inspector: string | null
    inspectionDate: Date | null
    result: $Enums.QCResult | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QCRecordCountAggregateOutputType = {
    id: number
    batchId: number
    inspector: number
    inspectionDate: number
    result: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type QCRecordMinAggregateInputType = {
    id?: true
    batchId?: true
    inspector?: true
    inspectionDate?: true
    result?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QCRecordMaxAggregateInputType = {
    id?: true
    batchId?: true
    inspector?: true
    inspectionDate?: true
    result?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QCRecordCountAggregateInputType = {
    id?: true
    batchId?: true
    inspector?: true
    inspectionDate?: true
    result?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type QCRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QCRecord to aggregate.
     */
    where?: QCRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QCRecords to fetch.
     */
    orderBy?: QCRecordOrderByWithRelationInput | QCRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QCRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QCRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QCRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QCRecords
    **/
    _count?: true | QCRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QCRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QCRecordMaxAggregateInputType
  }

  export type GetQCRecordAggregateType<T extends QCRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateQCRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQCRecord[P]>
      : GetScalarType<T[P], AggregateQCRecord[P]>
  }




  export type QCRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QCRecordWhereInput
    orderBy?: QCRecordOrderByWithAggregationInput | QCRecordOrderByWithAggregationInput[]
    by: QCRecordScalarFieldEnum[] | QCRecordScalarFieldEnum
    having?: QCRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QCRecordCountAggregateInputType | true
    _min?: QCRecordMinAggregateInputType
    _max?: QCRecordMaxAggregateInputType
  }

  export type QCRecordGroupByOutputType = {
    id: string
    batchId: string
    inspector: string
    inspectionDate: Date
    result: $Enums.QCResult
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: QCRecordCountAggregateOutputType | null
    _min: QCRecordMinAggregateOutputType | null
    _max: QCRecordMaxAggregateOutputType | null
  }

  type GetQCRecordGroupByPayload<T extends QCRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QCRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QCRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QCRecordGroupByOutputType[P]>
            : GetScalarType<T[P], QCRecordGroupByOutputType[P]>
        }
      >
    >


  export type QCRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    batchId?: boolean
    inspector?: boolean
    inspectionDate?: boolean
    result?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["qCRecord"]>

  export type QCRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    batchId?: boolean
    inspector?: boolean
    inspectionDate?: boolean
    result?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["qCRecord"]>

  export type QCRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    batchId?: boolean
    inspector?: boolean
    inspectionDate?: boolean
    result?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["qCRecord"]>

  export type QCRecordSelectScalar = {
    id?: boolean
    batchId?: boolean
    inspector?: boolean
    inspectionDate?: boolean
    result?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type QCRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "batchId" | "inspector" | "inspectionDate" | "result" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["qCRecord"]>
  export type QCRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }
  export type QCRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }
  export type QCRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }

  export type $QCRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QCRecord"
    objects: {
      batch: Prisma.$BatchPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      batchId: string
      inspector: string
      inspectionDate: Date
      result: $Enums.QCResult
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["qCRecord"]>
    composites: {}
  }

  type QCRecordGetPayload<S extends boolean | null | undefined | QCRecordDefaultArgs> = $Result.GetResult<Prisma.$QCRecordPayload, S>

  type QCRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QCRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QCRecordCountAggregateInputType | true
    }

  export interface QCRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QCRecord'], meta: { name: 'QCRecord' } }
    /**
     * Find zero or one QCRecord that matches the filter.
     * @param {QCRecordFindUniqueArgs} args - Arguments to find a QCRecord
     * @example
     * // Get one QCRecord
     * const qCRecord = await prisma.qCRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QCRecordFindUniqueArgs>(args: SelectSubset<T, QCRecordFindUniqueArgs<ExtArgs>>): Prisma__QCRecordClient<$Result.GetResult<Prisma.$QCRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QCRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QCRecordFindUniqueOrThrowArgs} args - Arguments to find a QCRecord
     * @example
     * // Get one QCRecord
     * const qCRecord = await prisma.qCRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QCRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, QCRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QCRecordClient<$Result.GetResult<Prisma.$QCRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QCRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QCRecordFindFirstArgs} args - Arguments to find a QCRecord
     * @example
     * // Get one QCRecord
     * const qCRecord = await prisma.qCRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QCRecordFindFirstArgs>(args?: SelectSubset<T, QCRecordFindFirstArgs<ExtArgs>>): Prisma__QCRecordClient<$Result.GetResult<Prisma.$QCRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QCRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QCRecordFindFirstOrThrowArgs} args - Arguments to find a QCRecord
     * @example
     * // Get one QCRecord
     * const qCRecord = await prisma.qCRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QCRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, QCRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__QCRecordClient<$Result.GetResult<Prisma.$QCRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QCRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QCRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QCRecords
     * const qCRecords = await prisma.qCRecord.findMany()
     * 
     * // Get first 10 QCRecords
     * const qCRecords = await prisma.qCRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const qCRecordWithIdOnly = await prisma.qCRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QCRecordFindManyArgs>(args?: SelectSubset<T, QCRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QCRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QCRecord.
     * @param {QCRecordCreateArgs} args - Arguments to create a QCRecord.
     * @example
     * // Create one QCRecord
     * const QCRecord = await prisma.qCRecord.create({
     *   data: {
     *     // ... data to create a QCRecord
     *   }
     * })
     * 
     */
    create<T extends QCRecordCreateArgs>(args: SelectSubset<T, QCRecordCreateArgs<ExtArgs>>): Prisma__QCRecordClient<$Result.GetResult<Prisma.$QCRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QCRecords.
     * @param {QCRecordCreateManyArgs} args - Arguments to create many QCRecords.
     * @example
     * // Create many QCRecords
     * const qCRecord = await prisma.qCRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QCRecordCreateManyArgs>(args?: SelectSubset<T, QCRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QCRecords and returns the data saved in the database.
     * @param {QCRecordCreateManyAndReturnArgs} args - Arguments to create many QCRecords.
     * @example
     * // Create many QCRecords
     * const qCRecord = await prisma.qCRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QCRecords and only return the `id`
     * const qCRecordWithIdOnly = await prisma.qCRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QCRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, QCRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QCRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QCRecord.
     * @param {QCRecordDeleteArgs} args - Arguments to delete one QCRecord.
     * @example
     * // Delete one QCRecord
     * const QCRecord = await prisma.qCRecord.delete({
     *   where: {
     *     // ... filter to delete one QCRecord
     *   }
     * })
     * 
     */
    delete<T extends QCRecordDeleteArgs>(args: SelectSubset<T, QCRecordDeleteArgs<ExtArgs>>): Prisma__QCRecordClient<$Result.GetResult<Prisma.$QCRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QCRecord.
     * @param {QCRecordUpdateArgs} args - Arguments to update one QCRecord.
     * @example
     * // Update one QCRecord
     * const qCRecord = await prisma.qCRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QCRecordUpdateArgs>(args: SelectSubset<T, QCRecordUpdateArgs<ExtArgs>>): Prisma__QCRecordClient<$Result.GetResult<Prisma.$QCRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QCRecords.
     * @param {QCRecordDeleteManyArgs} args - Arguments to filter QCRecords to delete.
     * @example
     * // Delete a few QCRecords
     * const { count } = await prisma.qCRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QCRecordDeleteManyArgs>(args?: SelectSubset<T, QCRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QCRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QCRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QCRecords
     * const qCRecord = await prisma.qCRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QCRecordUpdateManyArgs>(args: SelectSubset<T, QCRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QCRecords and returns the data updated in the database.
     * @param {QCRecordUpdateManyAndReturnArgs} args - Arguments to update many QCRecords.
     * @example
     * // Update many QCRecords
     * const qCRecord = await prisma.qCRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QCRecords and only return the `id`
     * const qCRecordWithIdOnly = await prisma.qCRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QCRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, QCRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QCRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QCRecord.
     * @param {QCRecordUpsertArgs} args - Arguments to update or create a QCRecord.
     * @example
     * // Update or create a QCRecord
     * const qCRecord = await prisma.qCRecord.upsert({
     *   create: {
     *     // ... data to create a QCRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QCRecord we want to update
     *   }
     * })
     */
    upsert<T extends QCRecordUpsertArgs>(args: SelectSubset<T, QCRecordUpsertArgs<ExtArgs>>): Prisma__QCRecordClient<$Result.GetResult<Prisma.$QCRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QCRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QCRecordCountArgs} args - Arguments to filter QCRecords to count.
     * @example
     * // Count the number of QCRecords
     * const count = await prisma.qCRecord.count({
     *   where: {
     *     // ... the filter for the QCRecords we want to count
     *   }
     * })
    **/
    count<T extends QCRecordCountArgs>(
      args?: Subset<T, QCRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QCRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QCRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QCRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QCRecordAggregateArgs>(args: Subset<T, QCRecordAggregateArgs>): Prisma.PrismaPromise<GetQCRecordAggregateType<T>>

    /**
     * Group by QCRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QCRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QCRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QCRecordGroupByArgs['orderBy'] }
        : { orderBy?: QCRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QCRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQCRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QCRecord model
   */
  readonly fields: QCRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QCRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QCRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    batch<T extends BatchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BatchDefaultArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QCRecord model
   */
  interface QCRecordFieldRefs {
    readonly id: FieldRef<"QCRecord", 'String'>
    readonly batchId: FieldRef<"QCRecord", 'String'>
    readonly inspector: FieldRef<"QCRecord", 'String'>
    readonly inspectionDate: FieldRef<"QCRecord", 'DateTime'>
    readonly result: FieldRef<"QCRecord", 'QCResult'>
    readonly notes: FieldRef<"QCRecord", 'String'>
    readonly createdAt: FieldRef<"QCRecord", 'DateTime'>
    readonly updatedAt: FieldRef<"QCRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * QCRecord findUnique
   */
  export type QCRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QCRecord
     */
    select?: QCRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QCRecord
     */
    omit?: QCRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QCRecordInclude<ExtArgs> | null
    /**
     * Filter, which QCRecord to fetch.
     */
    where: QCRecordWhereUniqueInput
  }

  /**
   * QCRecord findUniqueOrThrow
   */
  export type QCRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QCRecord
     */
    select?: QCRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QCRecord
     */
    omit?: QCRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QCRecordInclude<ExtArgs> | null
    /**
     * Filter, which QCRecord to fetch.
     */
    where: QCRecordWhereUniqueInput
  }

  /**
   * QCRecord findFirst
   */
  export type QCRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QCRecord
     */
    select?: QCRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QCRecord
     */
    omit?: QCRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QCRecordInclude<ExtArgs> | null
    /**
     * Filter, which QCRecord to fetch.
     */
    where?: QCRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QCRecords to fetch.
     */
    orderBy?: QCRecordOrderByWithRelationInput | QCRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QCRecords.
     */
    cursor?: QCRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QCRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QCRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QCRecords.
     */
    distinct?: QCRecordScalarFieldEnum | QCRecordScalarFieldEnum[]
  }

  /**
   * QCRecord findFirstOrThrow
   */
  export type QCRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QCRecord
     */
    select?: QCRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QCRecord
     */
    omit?: QCRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QCRecordInclude<ExtArgs> | null
    /**
     * Filter, which QCRecord to fetch.
     */
    where?: QCRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QCRecords to fetch.
     */
    orderBy?: QCRecordOrderByWithRelationInput | QCRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QCRecords.
     */
    cursor?: QCRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QCRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QCRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QCRecords.
     */
    distinct?: QCRecordScalarFieldEnum | QCRecordScalarFieldEnum[]
  }

  /**
   * QCRecord findMany
   */
  export type QCRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QCRecord
     */
    select?: QCRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QCRecord
     */
    omit?: QCRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QCRecordInclude<ExtArgs> | null
    /**
     * Filter, which QCRecords to fetch.
     */
    where?: QCRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QCRecords to fetch.
     */
    orderBy?: QCRecordOrderByWithRelationInput | QCRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QCRecords.
     */
    cursor?: QCRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QCRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QCRecords.
     */
    skip?: number
    distinct?: QCRecordScalarFieldEnum | QCRecordScalarFieldEnum[]
  }

  /**
   * QCRecord create
   */
  export type QCRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QCRecord
     */
    select?: QCRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QCRecord
     */
    omit?: QCRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QCRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a QCRecord.
     */
    data: XOR<QCRecordCreateInput, QCRecordUncheckedCreateInput>
  }

  /**
   * QCRecord createMany
   */
  export type QCRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QCRecords.
     */
    data: QCRecordCreateManyInput | QCRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QCRecord createManyAndReturn
   */
  export type QCRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QCRecord
     */
    select?: QCRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QCRecord
     */
    omit?: QCRecordOmit<ExtArgs> | null
    /**
     * The data used to create many QCRecords.
     */
    data: QCRecordCreateManyInput | QCRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QCRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QCRecord update
   */
  export type QCRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QCRecord
     */
    select?: QCRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QCRecord
     */
    omit?: QCRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QCRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a QCRecord.
     */
    data: XOR<QCRecordUpdateInput, QCRecordUncheckedUpdateInput>
    /**
     * Choose, which QCRecord to update.
     */
    where: QCRecordWhereUniqueInput
  }

  /**
   * QCRecord updateMany
   */
  export type QCRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QCRecords.
     */
    data: XOR<QCRecordUpdateManyMutationInput, QCRecordUncheckedUpdateManyInput>
    /**
     * Filter which QCRecords to update
     */
    where?: QCRecordWhereInput
    /**
     * Limit how many QCRecords to update.
     */
    limit?: number
  }

  /**
   * QCRecord updateManyAndReturn
   */
  export type QCRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QCRecord
     */
    select?: QCRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QCRecord
     */
    omit?: QCRecordOmit<ExtArgs> | null
    /**
     * The data used to update QCRecords.
     */
    data: XOR<QCRecordUpdateManyMutationInput, QCRecordUncheckedUpdateManyInput>
    /**
     * Filter which QCRecords to update
     */
    where?: QCRecordWhereInput
    /**
     * Limit how many QCRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QCRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * QCRecord upsert
   */
  export type QCRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QCRecord
     */
    select?: QCRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QCRecord
     */
    omit?: QCRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QCRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the QCRecord to update in case it exists.
     */
    where: QCRecordWhereUniqueInput
    /**
     * In case the QCRecord found by the `where` argument doesn't exist, create a new QCRecord with this data.
     */
    create: XOR<QCRecordCreateInput, QCRecordUncheckedCreateInput>
    /**
     * In case the QCRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QCRecordUpdateInput, QCRecordUncheckedUpdateInput>
  }

  /**
   * QCRecord delete
   */
  export type QCRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QCRecord
     */
    select?: QCRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QCRecord
     */
    omit?: QCRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QCRecordInclude<ExtArgs> | null
    /**
     * Filter which QCRecord to delete.
     */
    where: QCRecordWhereUniqueInput
  }

  /**
   * QCRecord deleteMany
   */
  export type QCRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QCRecords to delete
     */
    where?: QCRecordWhereInput
    /**
     * Limit how many QCRecords to delete.
     */
    limit?: number
  }

  /**
   * QCRecord without action
   */
  export type QCRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QCRecord
     */
    select?: QCRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QCRecord
     */
    omit?: QCRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QCRecordInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CustomerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    contactName: 'contactName',
    email: 'email',
    phone: 'phone',
    billingAddress: 'billingAddress',
    shippingAddress: 'shippingAddress',
    notes: 'notes',
    quickbooksId: 'quickbooksId',
    syncStatus: 'syncStatus',
    lastSyncedAt: 'lastSyncedAt',
    syncError: 'syncError',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const PurchaseOrderScalarFieldEnum: {
    id: 'id',
    systemOrderId: 'systemOrderId',
    customerId: 'customerId',
    poNumber: 'poNumber',
    dueDate: 'dueDate',
    priority: 'priority',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PurchaseOrderScalarFieldEnum = (typeof PurchaseOrderScalarFieldEnum)[keyof typeof PurchaseOrderScalarFieldEnum]


  export const OrderLineItemScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    partNumber: 'partNumber',
    partName: 'partName',
    drawingNumber: 'drawingNumber',
    revisionLevel: 'revisionLevel',
    quantity: 'quantity',
    dueDate: 'dueDate',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrderLineItemScalarFieldEnum = (typeof OrderLineItemScalarFieldEnum)[keyof typeof OrderLineItemScalarFieldEnum]


  export const FileAttachmentScalarFieldEnum: {
    id: 'id',
    lineItemId: 'lineItemId',
    fileName: 'fileName',
    fileType: 'fileType',
    fileUrl: 'fileUrl',
    uploadedBy: 'uploadedBy',
    description: 'description',
    createdAt: 'createdAt'
  };

  export type FileAttachmentScalarFieldEnum = (typeof FileAttachmentScalarFieldEnum)[keyof typeof FileAttachmentScalarFieldEnum]


  export const BatchScalarFieldEnum: {
    id: 'id',
    batchId: 'batchId',
    lineItemId: 'lineItemId',
    quantity: 'quantity',
    startDate: 'startDate',
    estimatedCompletion: 'estimatedCompletion',
    actualCompletion: 'actualCompletion',
    priority: 'priority',
    status: 'status',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BatchScalarFieldEnum = (typeof BatchScalarFieldEnum)[keyof typeof BatchScalarFieldEnum]


  export const RoutingStepScalarFieldEnum: {
    id: 'id',
    batchId: 'batchId',
    stepNumber: 'stepNumber',
    workstationId: 'workstationId',
    description: 'description',
    required: 'required',
    estimatedTime: 'estimatedTime',
    notes: 'notes',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoutingStepScalarFieldEnum = (typeof RoutingStepScalarFieldEnum)[keyof typeof RoutingStepScalarFieldEnum]


  export const WorkstationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WorkstationScalarFieldEnum = (typeof WorkstationScalarFieldEnum)[keyof typeof WorkstationScalarFieldEnum]


  export const StepConfirmationScalarFieldEnum: {
    id: 'id',
    stepId: 'stepId',
    workstationId: 'workstationId',
    operatorName: 'operatorName',
    operatorId: 'operatorId',
    startTime: 'startTime',
    endTime: 'endTime',
    notes: 'notes',
    photoUrl: 'photoUrl',
    flagged: 'flagged',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StepConfirmationScalarFieldEnum = (typeof StepConfirmationScalarFieldEnum)[keyof typeof StepConfirmationScalarFieldEnum]


  export const QCRecordScalarFieldEnum: {
    id: 'id',
    batchId: 'batchId',
    inspector: 'inspector',
    inspectionDate: 'inspectionDate',
    result: 'result',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type QCRecordScalarFieldEnum = (typeof QCRecordScalarFieldEnum)[keyof typeof QCRecordScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'SyncStatus'
   */
  export type EnumSyncStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SyncStatus'>
    


  /**
   * Reference to a field of type 'SyncStatus[]'
   */
  export type ListEnumSyncStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SyncStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'OrderPriority'
   */
  export type EnumOrderPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderPriority'>
    


  /**
   * Reference to a field of type 'OrderPriority[]'
   */
  export type ListEnumOrderPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderPriority[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'BatchPriority'
   */
  export type EnumBatchPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BatchPriority'>
    


  /**
   * Reference to a field of type 'BatchPriority[]'
   */
  export type ListEnumBatchPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BatchPriority[]'>
    


  /**
   * Reference to a field of type 'BatchStatus'
   */
  export type EnumBatchStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BatchStatus'>
    


  /**
   * Reference to a field of type 'BatchStatus[]'
   */
  export type ListEnumBatchStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BatchStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'StepStatus'
   */
  export type EnumStepStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StepStatus'>
    


  /**
   * Reference to a field of type 'StepStatus[]'
   */
  export type ListEnumStepStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StepStatus[]'>
    


  /**
   * Reference to a field of type 'ConfirmationStatus'
   */
  export type EnumConfirmationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConfirmationStatus'>
    


  /**
   * Reference to a field of type 'ConfirmationStatus[]'
   */
  export type ListEnumConfirmationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConfirmationStatus[]'>
    


  /**
   * Reference to a field of type 'QCResult'
   */
  export type EnumQCResultFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QCResult'>
    


  /**
   * Reference to a field of type 'QCResult[]'
   */
  export type ListEnumQCResultFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QCResult[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: StringFilter<"Customer"> | string
    name?: StringFilter<"Customer"> | string
    contactName?: StringNullableFilter<"Customer"> | string | null
    email?: StringNullableFilter<"Customer"> | string | null
    phone?: StringNullableFilter<"Customer"> | string | null
    billingAddress?: StringNullableFilter<"Customer"> | string | null
    shippingAddress?: StringNullableFilter<"Customer"> | string | null
    notes?: StringNullableFilter<"Customer"> | string | null
    quickbooksId?: StringNullableFilter<"Customer"> | string | null
    syncStatus?: EnumSyncStatusFilter<"Customer"> | $Enums.SyncStatus
    lastSyncedAt?: DateTimeNullableFilter<"Customer"> | Date | string | null
    syncError?: StringNullableFilter<"Customer"> | string | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    purchaseOrders?: PurchaseOrderListRelationFilter
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    contactName?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    billingAddress?: SortOrderInput | SortOrder
    shippingAddress?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    quickbooksId?: SortOrderInput | SortOrder
    syncStatus?: SortOrder
    lastSyncedAt?: SortOrderInput | SortOrder
    syncError?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    purchaseOrders?: PurchaseOrderOrderByRelationAggregateInput
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    name?: StringFilter<"Customer"> | string
    contactName?: StringNullableFilter<"Customer"> | string | null
    phone?: StringNullableFilter<"Customer"> | string | null
    billingAddress?: StringNullableFilter<"Customer"> | string | null
    shippingAddress?: StringNullableFilter<"Customer"> | string | null
    notes?: StringNullableFilter<"Customer"> | string | null
    quickbooksId?: StringNullableFilter<"Customer"> | string | null
    syncStatus?: EnumSyncStatusFilter<"Customer"> | $Enums.SyncStatus
    lastSyncedAt?: DateTimeNullableFilter<"Customer"> | Date | string | null
    syncError?: StringNullableFilter<"Customer"> | string | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    purchaseOrders?: PurchaseOrderListRelationFilter
  }, "id" | "email">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    contactName?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    billingAddress?: SortOrderInput | SortOrder
    shippingAddress?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    quickbooksId?: SortOrderInput | SortOrder
    syncStatus?: SortOrder
    lastSyncedAt?: SortOrderInput | SortOrder
    syncError?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Customer"> | string
    name?: StringWithAggregatesFilter<"Customer"> | string
    contactName?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    email?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    billingAddress?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    shippingAddress?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    quickbooksId?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    syncStatus?: EnumSyncStatusWithAggregatesFilter<"Customer"> | $Enums.SyncStatus
    lastSyncedAt?: DateTimeNullableWithAggregatesFilter<"Customer"> | Date | string | null
    syncError?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
  }

  export type PurchaseOrderWhereInput = {
    AND?: PurchaseOrderWhereInput | PurchaseOrderWhereInput[]
    OR?: PurchaseOrderWhereInput[]
    NOT?: PurchaseOrderWhereInput | PurchaseOrderWhereInput[]
    id?: StringFilter<"PurchaseOrder"> | string
    systemOrderId?: StringFilter<"PurchaseOrder"> | string
    customerId?: StringFilter<"PurchaseOrder"> | string
    poNumber?: StringFilter<"PurchaseOrder"> | string
    dueDate?: DateTimeFilter<"PurchaseOrder"> | Date | string
    priority?: EnumOrderPriorityFilter<"PurchaseOrder"> | $Enums.OrderPriority
    notes?: StringNullableFilter<"PurchaseOrder"> | string | null
    createdAt?: DateTimeFilter<"PurchaseOrder"> | Date | string
    updatedAt?: DateTimeFilter<"PurchaseOrder"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    lineItems?: OrderLineItemListRelationFilter
  }

  export type PurchaseOrderOrderByWithRelationInput = {
    id?: SortOrder
    systemOrderId?: SortOrder
    customerId?: SortOrder
    poNumber?: SortOrder
    dueDate?: SortOrder
    priority?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
    lineItems?: OrderLineItemOrderByRelationAggregateInput
  }

  export type PurchaseOrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    systemOrderId?: string
    AND?: PurchaseOrderWhereInput | PurchaseOrderWhereInput[]
    OR?: PurchaseOrderWhereInput[]
    NOT?: PurchaseOrderWhereInput | PurchaseOrderWhereInput[]
    customerId?: StringFilter<"PurchaseOrder"> | string
    poNumber?: StringFilter<"PurchaseOrder"> | string
    dueDate?: DateTimeFilter<"PurchaseOrder"> | Date | string
    priority?: EnumOrderPriorityFilter<"PurchaseOrder"> | $Enums.OrderPriority
    notes?: StringNullableFilter<"PurchaseOrder"> | string | null
    createdAt?: DateTimeFilter<"PurchaseOrder"> | Date | string
    updatedAt?: DateTimeFilter<"PurchaseOrder"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    lineItems?: OrderLineItemListRelationFilter
  }, "id" | "systemOrderId">

  export type PurchaseOrderOrderByWithAggregationInput = {
    id?: SortOrder
    systemOrderId?: SortOrder
    customerId?: SortOrder
    poNumber?: SortOrder
    dueDate?: SortOrder
    priority?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PurchaseOrderCountOrderByAggregateInput
    _max?: PurchaseOrderMaxOrderByAggregateInput
    _min?: PurchaseOrderMinOrderByAggregateInput
  }

  export type PurchaseOrderScalarWhereWithAggregatesInput = {
    AND?: PurchaseOrderScalarWhereWithAggregatesInput | PurchaseOrderScalarWhereWithAggregatesInput[]
    OR?: PurchaseOrderScalarWhereWithAggregatesInput[]
    NOT?: PurchaseOrderScalarWhereWithAggregatesInput | PurchaseOrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PurchaseOrder"> | string
    systemOrderId?: StringWithAggregatesFilter<"PurchaseOrder"> | string
    customerId?: StringWithAggregatesFilter<"PurchaseOrder"> | string
    poNumber?: StringWithAggregatesFilter<"PurchaseOrder"> | string
    dueDate?: DateTimeWithAggregatesFilter<"PurchaseOrder"> | Date | string
    priority?: EnumOrderPriorityWithAggregatesFilter<"PurchaseOrder"> | $Enums.OrderPriority
    notes?: StringNullableWithAggregatesFilter<"PurchaseOrder"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PurchaseOrder"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PurchaseOrder"> | Date | string
  }

  export type OrderLineItemWhereInput = {
    AND?: OrderLineItemWhereInput | OrderLineItemWhereInput[]
    OR?: OrderLineItemWhereInput[]
    NOT?: OrderLineItemWhereInput | OrderLineItemWhereInput[]
    id?: StringFilter<"OrderLineItem"> | string
    orderId?: StringFilter<"OrderLineItem"> | string
    partNumber?: StringFilter<"OrderLineItem"> | string
    partName?: StringFilter<"OrderLineItem"> | string
    drawingNumber?: StringNullableFilter<"OrderLineItem"> | string | null
    revisionLevel?: StringNullableFilter<"OrderLineItem"> | string | null
    quantity?: IntFilter<"OrderLineItem"> | number
    dueDate?: DateTimeNullableFilter<"OrderLineItem"> | Date | string | null
    notes?: StringNullableFilter<"OrderLineItem"> | string | null
    createdAt?: DateTimeFilter<"OrderLineItem"> | Date | string
    updatedAt?: DateTimeFilter<"OrderLineItem"> | Date | string
    purchaseOrder?: XOR<PurchaseOrderScalarRelationFilter, PurchaseOrderWhereInput>
    fileAttachments?: FileAttachmentListRelationFilter
    batches?: BatchListRelationFilter
  }

  export type OrderLineItemOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    partNumber?: SortOrder
    partName?: SortOrder
    drawingNumber?: SortOrderInput | SortOrder
    revisionLevel?: SortOrderInput | SortOrder
    quantity?: SortOrder
    dueDate?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    purchaseOrder?: PurchaseOrderOrderByWithRelationInput
    fileAttachments?: FileAttachmentOrderByRelationAggregateInput
    batches?: BatchOrderByRelationAggregateInput
  }

  export type OrderLineItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderLineItemWhereInput | OrderLineItemWhereInput[]
    OR?: OrderLineItemWhereInput[]
    NOT?: OrderLineItemWhereInput | OrderLineItemWhereInput[]
    orderId?: StringFilter<"OrderLineItem"> | string
    partNumber?: StringFilter<"OrderLineItem"> | string
    partName?: StringFilter<"OrderLineItem"> | string
    drawingNumber?: StringNullableFilter<"OrderLineItem"> | string | null
    revisionLevel?: StringNullableFilter<"OrderLineItem"> | string | null
    quantity?: IntFilter<"OrderLineItem"> | number
    dueDate?: DateTimeNullableFilter<"OrderLineItem"> | Date | string | null
    notes?: StringNullableFilter<"OrderLineItem"> | string | null
    createdAt?: DateTimeFilter<"OrderLineItem"> | Date | string
    updatedAt?: DateTimeFilter<"OrderLineItem"> | Date | string
    purchaseOrder?: XOR<PurchaseOrderScalarRelationFilter, PurchaseOrderWhereInput>
    fileAttachments?: FileAttachmentListRelationFilter
    batches?: BatchListRelationFilter
  }, "id">

  export type OrderLineItemOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    partNumber?: SortOrder
    partName?: SortOrder
    drawingNumber?: SortOrderInput | SortOrder
    revisionLevel?: SortOrderInput | SortOrder
    quantity?: SortOrder
    dueDate?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrderLineItemCountOrderByAggregateInput
    _avg?: OrderLineItemAvgOrderByAggregateInput
    _max?: OrderLineItemMaxOrderByAggregateInput
    _min?: OrderLineItemMinOrderByAggregateInput
    _sum?: OrderLineItemSumOrderByAggregateInput
  }

  export type OrderLineItemScalarWhereWithAggregatesInput = {
    AND?: OrderLineItemScalarWhereWithAggregatesInput | OrderLineItemScalarWhereWithAggregatesInput[]
    OR?: OrderLineItemScalarWhereWithAggregatesInput[]
    NOT?: OrderLineItemScalarWhereWithAggregatesInput | OrderLineItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrderLineItem"> | string
    orderId?: StringWithAggregatesFilter<"OrderLineItem"> | string
    partNumber?: StringWithAggregatesFilter<"OrderLineItem"> | string
    partName?: StringWithAggregatesFilter<"OrderLineItem"> | string
    drawingNumber?: StringNullableWithAggregatesFilter<"OrderLineItem"> | string | null
    revisionLevel?: StringNullableWithAggregatesFilter<"OrderLineItem"> | string | null
    quantity?: IntWithAggregatesFilter<"OrderLineItem"> | number
    dueDate?: DateTimeNullableWithAggregatesFilter<"OrderLineItem"> | Date | string | null
    notes?: StringNullableWithAggregatesFilter<"OrderLineItem"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OrderLineItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"OrderLineItem"> | Date | string
  }

  export type FileAttachmentWhereInput = {
    AND?: FileAttachmentWhereInput | FileAttachmentWhereInput[]
    OR?: FileAttachmentWhereInput[]
    NOT?: FileAttachmentWhereInput | FileAttachmentWhereInput[]
    id?: StringFilter<"FileAttachment"> | string
    lineItemId?: StringFilter<"FileAttachment"> | string
    fileName?: StringFilter<"FileAttachment"> | string
    fileType?: StringFilter<"FileAttachment"> | string
    fileUrl?: StringFilter<"FileAttachment"> | string
    uploadedBy?: StringFilter<"FileAttachment"> | string
    description?: StringNullableFilter<"FileAttachment"> | string | null
    createdAt?: DateTimeFilter<"FileAttachment"> | Date | string
    lineItem?: XOR<OrderLineItemScalarRelationFilter, OrderLineItemWhereInput>
  }

  export type FileAttachmentOrderByWithRelationInput = {
    id?: SortOrder
    lineItemId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileUrl?: SortOrder
    uploadedBy?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    lineItem?: OrderLineItemOrderByWithRelationInput
  }

  export type FileAttachmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FileAttachmentWhereInput | FileAttachmentWhereInput[]
    OR?: FileAttachmentWhereInput[]
    NOT?: FileAttachmentWhereInput | FileAttachmentWhereInput[]
    lineItemId?: StringFilter<"FileAttachment"> | string
    fileName?: StringFilter<"FileAttachment"> | string
    fileType?: StringFilter<"FileAttachment"> | string
    fileUrl?: StringFilter<"FileAttachment"> | string
    uploadedBy?: StringFilter<"FileAttachment"> | string
    description?: StringNullableFilter<"FileAttachment"> | string | null
    createdAt?: DateTimeFilter<"FileAttachment"> | Date | string
    lineItem?: XOR<OrderLineItemScalarRelationFilter, OrderLineItemWhereInput>
  }, "id">

  export type FileAttachmentOrderByWithAggregationInput = {
    id?: SortOrder
    lineItemId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileUrl?: SortOrder
    uploadedBy?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: FileAttachmentCountOrderByAggregateInput
    _max?: FileAttachmentMaxOrderByAggregateInput
    _min?: FileAttachmentMinOrderByAggregateInput
  }

  export type FileAttachmentScalarWhereWithAggregatesInput = {
    AND?: FileAttachmentScalarWhereWithAggregatesInput | FileAttachmentScalarWhereWithAggregatesInput[]
    OR?: FileAttachmentScalarWhereWithAggregatesInput[]
    NOT?: FileAttachmentScalarWhereWithAggregatesInput | FileAttachmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FileAttachment"> | string
    lineItemId?: StringWithAggregatesFilter<"FileAttachment"> | string
    fileName?: StringWithAggregatesFilter<"FileAttachment"> | string
    fileType?: StringWithAggregatesFilter<"FileAttachment"> | string
    fileUrl?: StringWithAggregatesFilter<"FileAttachment"> | string
    uploadedBy?: StringWithAggregatesFilter<"FileAttachment"> | string
    description?: StringNullableWithAggregatesFilter<"FileAttachment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"FileAttachment"> | Date | string
  }

  export type BatchWhereInput = {
    AND?: BatchWhereInput | BatchWhereInput[]
    OR?: BatchWhereInput[]
    NOT?: BatchWhereInput | BatchWhereInput[]
    id?: StringFilter<"Batch"> | string
    batchId?: StringFilter<"Batch"> | string
    lineItemId?: StringFilter<"Batch"> | string
    quantity?: IntFilter<"Batch"> | number
    startDate?: DateTimeNullableFilter<"Batch"> | Date | string | null
    estimatedCompletion?: DateTimeNullableFilter<"Batch"> | Date | string | null
    actualCompletion?: DateTimeNullableFilter<"Batch"> | Date | string | null
    priority?: EnumBatchPriorityFilter<"Batch"> | $Enums.BatchPriority
    status?: EnumBatchStatusFilter<"Batch"> | $Enums.BatchStatus
    notes?: StringNullableFilter<"Batch"> | string | null
    createdAt?: DateTimeFilter<"Batch"> | Date | string
    updatedAt?: DateTimeFilter<"Batch"> | Date | string
    lineItem?: XOR<OrderLineItemScalarRelationFilter, OrderLineItemWhereInput>
    routingSteps?: RoutingStepListRelationFilter
    qcRecords?: QCRecordListRelationFilter
  }

  export type BatchOrderByWithRelationInput = {
    id?: SortOrder
    batchId?: SortOrder
    lineItemId?: SortOrder
    quantity?: SortOrder
    startDate?: SortOrderInput | SortOrder
    estimatedCompletion?: SortOrderInput | SortOrder
    actualCompletion?: SortOrderInput | SortOrder
    priority?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lineItem?: OrderLineItemOrderByWithRelationInput
    routingSteps?: RoutingStepOrderByRelationAggregateInput
    qcRecords?: QCRecordOrderByRelationAggregateInput
  }

  export type BatchWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    batchId?: string
    AND?: BatchWhereInput | BatchWhereInput[]
    OR?: BatchWhereInput[]
    NOT?: BatchWhereInput | BatchWhereInput[]
    lineItemId?: StringFilter<"Batch"> | string
    quantity?: IntFilter<"Batch"> | number
    startDate?: DateTimeNullableFilter<"Batch"> | Date | string | null
    estimatedCompletion?: DateTimeNullableFilter<"Batch"> | Date | string | null
    actualCompletion?: DateTimeNullableFilter<"Batch"> | Date | string | null
    priority?: EnumBatchPriorityFilter<"Batch"> | $Enums.BatchPriority
    status?: EnumBatchStatusFilter<"Batch"> | $Enums.BatchStatus
    notes?: StringNullableFilter<"Batch"> | string | null
    createdAt?: DateTimeFilter<"Batch"> | Date | string
    updatedAt?: DateTimeFilter<"Batch"> | Date | string
    lineItem?: XOR<OrderLineItemScalarRelationFilter, OrderLineItemWhereInput>
    routingSteps?: RoutingStepListRelationFilter
    qcRecords?: QCRecordListRelationFilter
  }, "id" | "batchId">

  export type BatchOrderByWithAggregationInput = {
    id?: SortOrder
    batchId?: SortOrder
    lineItemId?: SortOrder
    quantity?: SortOrder
    startDate?: SortOrderInput | SortOrder
    estimatedCompletion?: SortOrderInput | SortOrder
    actualCompletion?: SortOrderInput | SortOrder
    priority?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BatchCountOrderByAggregateInput
    _avg?: BatchAvgOrderByAggregateInput
    _max?: BatchMaxOrderByAggregateInput
    _min?: BatchMinOrderByAggregateInput
    _sum?: BatchSumOrderByAggregateInput
  }

  export type BatchScalarWhereWithAggregatesInput = {
    AND?: BatchScalarWhereWithAggregatesInput | BatchScalarWhereWithAggregatesInput[]
    OR?: BatchScalarWhereWithAggregatesInput[]
    NOT?: BatchScalarWhereWithAggregatesInput | BatchScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Batch"> | string
    batchId?: StringWithAggregatesFilter<"Batch"> | string
    lineItemId?: StringWithAggregatesFilter<"Batch"> | string
    quantity?: IntWithAggregatesFilter<"Batch"> | number
    startDate?: DateTimeNullableWithAggregatesFilter<"Batch"> | Date | string | null
    estimatedCompletion?: DateTimeNullableWithAggregatesFilter<"Batch"> | Date | string | null
    actualCompletion?: DateTimeNullableWithAggregatesFilter<"Batch"> | Date | string | null
    priority?: EnumBatchPriorityWithAggregatesFilter<"Batch"> | $Enums.BatchPriority
    status?: EnumBatchStatusWithAggregatesFilter<"Batch"> | $Enums.BatchStatus
    notes?: StringNullableWithAggregatesFilter<"Batch"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Batch"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Batch"> | Date | string
  }

  export type RoutingStepWhereInput = {
    AND?: RoutingStepWhereInput | RoutingStepWhereInput[]
    OR?: RoutingStepWhereInput[]
    NOT?: RoutingStepWhereInput | RoutingStepWhereInput[]
    id?: StringFilter<"RoutingStep"> | string
    batchId?: StringFilter<"RoutingStep"> | string
    stepNumber?: IntFilter<"RoutingStep"> | number
    workstationId?: StringFilter<"RoutingStep"> | string
    description?: StringFilter<"RoutingStep"> | string
    required?: BoolFilter<"RoutingStep"> | boolean
    estimatedTime?: IntNullableFilter<"RoutingStep"> | number | null
    notes?: StringNullableFilter<"RoutingStep"> | string | null
    status?: EnumStepStatusFilter<"RoutingStep"> | $Enums.StepStatus
    createdAt?: DateTimeFilter<"RoutingStep"> | Date | string
    updatedAt?: DateTimeFilter<"RoutingStep"> | Date | string
    batch?: XOR<BatchScalarRelationFilter, BatchWhereInput>
    workstation?: XOR<WorkstationScalarRelationFilter, WorkstationWhereInput>
    confirmations?: StepConfirmationListRelationFilter
  }

  export type RoutingStepOrderByWithRelationInput = {
    id?: SortOrder
    batchId?: SortOrder
    stepNumber?: SortOrder
    workstationId?: SortOrder
    description?: SortOrder
    required?: SortOrder
    estimatedTime?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    batch?: BatchOrderByWithRelationInput
    workstation?: WorkstationOrderByWithRelationInput
    confirmations?: StepConfirmationOrderByRelationAggregateInput
  }

  export type RoutingStepWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    batchId_stepNumber?: RoutingStepBatchIdStepNumberCompoundUniqueInput
    AND?: RoutingStepWhereInput | RoutingStepWhereInput[]
    OR?: RoutingStepWhereInput[]
    NOT?: RoutingStepWhereInput | RoutingStepWhereInput[]
    batchId?: StringFilter<"RoutingStep"> | string
    stepNumber?: IntFilter<"RoutingStep"> | number
    workstationId?: StringFilter<"RoutingStep"> | string
    description?: StringFilter<"RoutingStep"> | string
    required?: BoolFilter<"RoutingStep"> | boolean
    estimatedTime?: IntNullableFilter<"RoutingStep"> | number | null
    notes?: StringNullableFilter<"RoutingStep"> | string | null
    status?: EnumStepStatusFilter<"RoutingStep"> | $Enums.StepStatus
    createdAt?: DateTimeFilter<"RoutingStep"> | Date | string
    updatedAt?: DateTimeFilter<"RoutingStep"> | Date | string
    batch?: XOR<BatchScalarRelationFilter, BatchWhereInput>
    workstation?: XOR<WorkstationScalarRelationFilter, WorkstationWhereInput>
    confirmations?: StepConfirmationListRelationFilter
  }, "id" | "batchId_stepNumber">

  export type RoutingStepOrderByWithAggregationInput = {
    id?: SortOrder
    batchId?: SortOrder
    stepNumber?: SortOrder
    workstationId?: SortOrder
    description?: SortOrder
    required?: SortOrder
    estimatedTime?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoutingStepCountOrderByAggregateInput
    _avg?: RoutingStepAvgOrderByAggregateInput
    _max?: RoutingStepMaxOrderByAggregateInput
    _min?: RoutingStepMinOrderByAggregateInput
    _sum?: RoutingStepSumOrderByAggregateInput
  }

  export type RoutingStepScalarWhereWithAggregatesInput = {
    AND?: RoutingStepScalarWhereWithAggregatesInput | RoutingStepScalarWhereWithAggregatesInput[]
    OR?: RoutingStepScalarWhereWithAggregatesInput[]
    NOT?: RoutingStepScalarWhereWithAggregatesInput | RoutingStepScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RoutingStep"> | string
    batchId?: StringWithAggregatesFilter<"RoutingStep"> | string
    stepNumber?: IntWithAggregatesFilter<"RoutingStep"> | number
    workstationId?: StringWithAggregatesFilter<"RoutingStep"> | string
    description?: StringWithAggregatesFilter<"RoutingStep"> | string
    required?: BoolWithAggregatesFilter<"RoutingStep"> | boolean
    estimatedTime?: IntNullableWithAggregatesFilter<"RoutingStep"> | number | null
    notes?: StringNullableWithAggregatesFilter<"RoutingStep"> | string | null
    status?: EnumStepStatusWithAggregatesFilter<"RoutingStep"> | $Enums.StepStatus
    createdAt?: DateTimeWithAggregatesFilter<"RoutingStep"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RoutingStep"> | Date | string
  }

  export type WorkstationWhereInput = {
    AND?: WorkstationWhereInput | WorkstationWhereInput[]
    OR?: WorkstationWhereInput[]
    NOT?: WorkstationWhereInput | WorkstationWhereInput[]
    id?: StringFilter<"Workstation"> | string
    name?: StringFilter<"Workstation"> | string
    description?: StringNullableFilter<"Workstation"> | string | null
    active?: BoolFilter<"Workstation"> | boolean
    createdAt?: DateTimeFilter<"Workstation"> | Date | string
    updatedAt?: DateTimeFilter<"Workstation"> | Date | string
    routingSteps?: RoutingStepListRelationFilter
    confirmations?: StepConfirmationListRelationFilter
  }

  export type WorkstationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    routingSteps?: RoutingStepOrderByRelationAggregateInput
    confirmations?: StepConfirmationOrderByRelationAggregateInput
  }

  export type WorkstationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: WorkstationWhereInput | WorkstationWhereInput[]
    OR?: WorkstationWhereInput[]
    NOT?: WorkstationWhereInput | WorkstationWhereInput[]
    description?: StringNullableFilter<"Workstation"> | string | null
    active?: BoolFilter<"Workstation"> | boolean
    createdAt?: DateTimeFilter<"Workstation"> | Date | string
    updatedAt?: DateTimeFilter<"Workstation"> | Date | string
    routingSteps?: RoutingStepListRelationFilter
    confirmations?: StepConfirmationListRelationFilter
  }, "id" | "name">

  export type WorkstationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WorkstationCountOrderByAggregateInput
    _max?: WorkstationMaxOrderByAggregateInput
    _min?: WorkstationMinOrderByAggregateInput
  }

  export type WorkstationScalarWhereWithAggregatesInput = {
    AND?: WorkstationScalarWhereWithAggregatesInput | WorkstationScalarWhereWithAggregatesInput[]
    OR?: WorkstationScalarWhereWithAggregatesInput[]
    NOT?: WorkstationScalarWhereWithAggregatesInput | WorkstationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Workstation"> | string
    name?: StringWithAggregatesFilter<"Workstation"> | string
    description?: StringNullableWithAggregatesFilter<"Workstation"> | string | null
    active?: BoolWithAggregatesFilter<"Workstation"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Workstation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Workstation"> | Date | string
  }

  export type StepConfirmationWhereInput = {
    AND?: StepConfirmationWhereInput | StepConfirmationWhereInput[]
    OR?: StepConfirmationWhereInput[]
    NOT?: StepConfirmationWhereInput | StepConfirmationWhereInput[]
    id?: StringFilter<"StepConfirmation"> | string
    stepId?: StringFilter<"StepConfirmation"> | string
    workstationId?: StringFilter<"StepConfirmation"> | string
    operatorName?: StringFilter<"StepConfirmation"> | string
    operatorId?: StringNullableFilter<"StepConfirmation"> | string | null
    startTime?: DateTimeNullableFilter<"StepConfirmation"> | Date | string | null
    endTime?: DateTimeNullableFilter<"StepConfirmation"> | Date | string | null
    notes?: StringNullableFilter<"StepConfirmation"> | string | null
    photoUrl?: StringNullableFilter<"StepConfirmation"> | string | null
    flagged?: BoolFilter<"StepConfirmation"> | boolean
    status?: EnumConfirmationStatusFilter<"StepConfirmation"> | $Enums.ConfirmationStatus
    createdAt?: DateTimeFilter<"StepConfirmation"> | Date | string
    updatedAt?: DateTimeFilter<"StepConfirmation"> | Date | string
    routingStep?: XOR<RoutingStepScalarRelationFilter, RoutingStepWhereInput>
    workstation?: XOR<WorkstationScalarRelationFilter, WorkstationWhereInput>
  }

  export type StepConfirmationOrderByWithRelationInput = {
    id?: SortOrder
    stepId?: SortOrder
    workstationId?: SortOrder
    operatorName?: SortOrder
    operatorId?: SortOrderInput | SortOrder
    startTime?: SortOrderInput | SortOrder
    endTime?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    flagged?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    routingStep?: RoutingStepOrderByWithRelationInput
    workstation?: WorkstationOrderByWithRelationInput
  }

  export type StepConfirmationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StepConfirmationWhereInput | StepConfirmationWhereInput[]
    OR?: StepConfirmationWhereInput[]
    NOT?: StepConfirmationWhereInput | StepConfirmationWhereInput[]
    stepId?: StringFilter<"StepConfirmation"> | string
    workstationId?: StringFilter<"StepConfirmation"> | string
    operatorName?: StringFilter<"StepConfirmation"> | string
    operatorId?: StringNullableFilter<"StepConfirmation"> | string | null
    startTime?: DateTimeNullableFilter<"StepConfirmation"> | Date | string | null
    endTime?: DateTimeNullableFilter<"StepConfirmation"> | Date | string | null
    notes?: StringNullableFilter<"StepConfirmation"> | string | null
    photoUrl?: StringNullableFilter<"StepConfirmation"> | string | null
    flagged?: BoolFilter<"StepConfirmation"> | boolean
    status?: EnumConfirmationStatusFilter<"StepConfirmation"> | $Enums.ConfirmationStatus
    createdAt?: DateTimeFilter<"StepConfirmation"> | Date | string
    updatedAt?: DateTimeFilter<"StepConfirmation"> | Date | string
    routingStep?: XOR<RoutingStepScalarRelationFilter, RoutingStepWhereInput>
    workstation?: XOR<WorkstationScalarRelationFilter, WorkstationWhereInput>
  }, "id">

  export type StepConfirmationOrderByWithAggregationInput = {
    id?: SortOrder
    stepId?: SortOrder
    workstationId?: SortOrder
    operatorName?: SortOrder
    operatorId?: SortOrderInput | SortOrder
    startTime?: SortOrderInput | SortOrder
    endTime?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    flagged?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StepConfirmationCountOrderByAggregateInput
    _max?: StepConfirmationMaxOrderByAggregateInput
    _min?: StepConfirmationMinOrderByAggregateInput
  }

  export type StepConfirmationScalarWhereWithAggregatesInput = {
    AND?: StepConfirmationScalarWhereWithAggregatesInput | StepConfirmationScalarWhereWithAggregatesInput[]
    OR?: StepConfirmationScalarWhereWithAggregatesInput[]
    NOT?: StepConfirmationScalarWhereWithAggregatesInput | StepConfirmationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StepConfirmation"> | string
    stepId?: StringWithAggregatesFilter<"StepConfirmation"> | string
    workstationId?: StringWithAggregatesFilter<"StepConfirmation"> | string
    operatorName?: StringWithAggregatesFilter<"StepConfirmation"> | string
    operatorId?: StringNullableWithAggregatesFilter<"StepConfirmation"> | string | null
    startTime?: DateTimeNullableWithAggregatesFilter<"StepConfirmation"> | Date | string | null
    endTime?: DateTimeNullableWithAggregatesFilter<"StepConfirmation"> | Date | string | null
    notes?: StringNullableWithAggregatesFilter<"StepConfirmation"> | string | null
    photoUrl?: StringNullableWithAggregatesFilter<"StepConfirmation"> | string | null
    flagged?: BoolWithAggregatesFilter<"StepConfirmation"> | boolean
    status?: EnumConfirmationStatusWithAggregatesFilter<"StepConfirmation"> | $Enums.ConfirmationStatus
    createdAt?: DateTimeWithAggregatesFilter<"StepConfirmation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StepConfirmation"> | Date | string
  }

  export type QCRecordWhereInput = {
    AND?: QCRecordWhereInput | QCRecordWhereInput[]
    OR?: QCRecordWhereInput[]
    NOT?: QCRecordWhereInput | QCRecordWhereInput[]
    id?: StringFilter<"QCRecord"> | string
    batchId?: StringFilter<"QCRecord"> | string
    inspector?: StringFilter<"QCRecord"> | string
    inspectionDate?: DateTimeFilter<"QCRecord"> | Date | string
    result?: EnumQCResultFilter<"QCRecord"> | $Enums.QCResult
    notes?: StringNullableFilter<"QCRecord"> | string | null
    createdAt?: DateTimeFilter<"QCRecord"> | Date | string
    updatedAt?: DateTimeFilter<"QCRecord"> | Date | string
    batch?: XOR<BatchScalarRelationFilter, BatchWhereInput>
  }

  export type QCRecordOrderByWithRelationInput = {
    id?: SortOrder
    batchId?: SortOrder
    inspector?: SortOrder
    inspectionDate?: SortOrder
    result?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    batch?: BatchOrderByWithRelationInput
  }

  export type QCRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QCRecordWhereInput | QCRecordWhereInput[]
    OR?: QCRecordWhereInput[]
    NOT?: QCRecordWhereInput | QCRecordWhereInput[]
    batchId?: StringFilter<"QCRecord"> | string
    inspector?: StringFilter<"QCRecord"> | string
    inspectionDate?: DateTimeFilter<"QCRecord"> | Date | string
    result?: EnumQCResultFilter<"QCRecord"> | $Enums.QCResult
    notes?: StringNullableFilter<"QCRecord"> | string | null
    createdAt?: DateTimeFilter<"QCRecord"> | Date | string
    updatedAt?: DateTimeFilter<"QCRecord"> | Date | string
    batch?: XOR<BatchScalarRelationFilter, BatchWhereInput>
  }, "id">

  export type QCRecordOrderByWithAggregationInput = {
    id?: SortOrder
    batchId?: SortOrder
    inspector?: SortOrder
    inspectionDate?: SortOrder
    result?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: QCRecordCountOrderByAggregateInput
    _max?: QCRecordMaxOrderByAggregateInput
    _min?: QCRecordMinOrderByAggregateInput
  }

  export type QCRecordScalarWhereWithAggregatesInput = {
    AND?: QCRecordScalarWhereWithAggregatesInput | QCRecordScalarWhereWithAggregatesInput[]
    OR?: QCRecordScalarWhereWithAggregatesInput[]
    NOT?: QCRecordScalarWhereWithAggregatesInput | QCRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QCRecord"> | string
    batchId?: StringWithAggregatesFilter<"QCRecord"> | string
    inspector?: StringWithAggregatesFilter<"QCRecord"> | string
    inspectionDate?: DateTimeWithAggregatesFilter<"QCRecord"> | Date | string
    result?: EnumQCResultWithAggregatesFilter<"QCRecord"> | $Enums.QCResult
    notes?: StringNullableWithAggregatesFilter<"QCRecord"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"QCRecord"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"QCRecord"> | Date | string
  }

  export type CustomerCreateInput = {
    id?: string
    name: string
    contactName?: string | null
    email?: string | null
    phone?: string | null
    billingAddress?: string | null
    shippingAddress?: string | null
    notes?: string | null
    quickbooksId?: string | null
    syncStatus?: $Enums.SyncStatus
    lastSyncedAt?: Date | string | null
    syncError?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    purchaseOrders?: PurchaseOrderCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateInput = {
    id?: string
    name: string
    contactName?: string | null
    email?: string | null
    phone?: string | null
    billingAddress?: string | null
    shippingAddress?: string | null
    notes?: string | null
    quickbooksId?: string | null
    syncStatus?: $Enums.SyncStatus
    lastSyncedAt?: Date | string | null
    syncError?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    purchaseOrders?: PurchaseOrderUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    quickbooksId?: NullableStringFieldUpdateOperationsInput | string | null
    syncStatus?: EnumSyncStatusFieldUpdateOperationsInput | $Enums.SyncStatus
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchaseOrders?: PurchaseOrderUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    quickbooksId?: NullableStringFieldUpdateOperationsInput | string | null
    syncStatus?: EnumSyncStatusFieldUpdateOperationsInput | $Enums.SyncStatus
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchaseOrders?: PurchaseOrderUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateManyInput = {
    id?: string
    name: string
    contactName?: string | null
    email?: string | null
    phone?: string | null
    billingAddress?: string | null
    shippingAddress?: string | null
    notes?: string | null
    quickbooksId?: string | null
    syncStatus?: $Enums.SyncStatus
    lastSyncedAt?: Date | string | null
    syncError?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    quickbooksId?: NullableStringFieldUpdateOperationsInput | string | null
    syncStatus?: EnumSyncStatusFieldUpdateOperationsInput | $Enums.SyncStatus
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    quickbooksId?: NullableStringFieldUpdateOperationsInput | string | null
    syncStatus?: EnumSyncStatusFieldUpdateOperationsInput | $Enums.SyncStatus
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseOrderCreateInput = {
    id?: string
    systemOrderId?: string
    poNumber: string
    dueDate: Date | string
    priority?: $Enums.OrderPriority
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutPurchaseOrdersInput
    lineItems?: OrderLineItemCreateNestedManyWithoutPurchaseOrderInput
  }

  export type PurchaseOrderUncheckedCreateInput = {
    id?: string
    systemOrderId?: string
    customerId: string
    poNumber: string
    dueDate: Date | string
    priority?: $Enums.OrderPriority
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lineItems?: OrderLineItemUncheckedCreateNestedManyWithoutPurchaseOrderInput
  }

  export type PurchaseOrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    systemOrderId?: StringFieldUpdateOperationsInput | string
    poNumber?: StringFieldUpdateOperationsInput | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    priority?: EnumOrderPriorityFieldUpdateOperationsInput | $Enums.OrderPriority
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutPurchaseOrdersNestedInput
    lineItems?: OrderLineItemUpdateManyWithoutPurchaseOrderNestedInput
  }

  export type PurchaseOrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    systemOrderId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    poNumber?: StringFieldUpdateOperationsInput | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    priority?: EnumOrderPriorityFieldUpdateOperationsInput | $Enums.OrderPriority
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lineItems?: OrderLineItemUncheckedUpdateManyWithoutPurchaseOrderNestedInput
  }

  export type PurchaseOrderCreateManyInput = {
    id?: string
    systemOrderId?: string
    customerId: string
    poNumber: string
    dueDate: Date | string
    priority?: $Enums.OrderPriority
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PurchaseOrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    systemOrderId?: StringFieldUpdateOperationsInput | string
    poNumber?: StringFieldUpdateOperationsInput | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    priority?: EnumOrderPriorityFieldUpdateOperationsInput | $Enums.OrderPriority
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseOrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    systemOrderId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    poNumber?: StringFieldUpdateOperationsInput | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    priority?: EnumOrderPriorityFieldUpdateOperationsInput | $Enums.OrderPriority
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderLineItemCreateInput = {
    id?: string
    partNumber: string
    partName: string
    drawingNumber?: string | null
    revisionLevel?: string | null
    quantity: number
    dueDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    purchaseOrder: PurchaseOrderCreateNestedOneWithoutLineItemsInput
    fileAttachments?: FileAttachmentCreateNestedManyWithoutLineItemInput
    batches?: BatchCreateNestedManyWithoutLineItemInput
  }

  export type OrderLineItemUncheckedCreateInput = {
    id?: string
    orderId: string
    partNumber: string
    partName: string
    drawingNumber?: string | null
    revisionLevel?: string | null
    quantity: number
    dueDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fileAttachments?: FileAttachmentUncheckedCreateNestedManyWithoutLineItemInput
    batches?: BatchUncheckedCreateNestedManyWithoutLineItemInput
  }

  export type OrderLineItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    drawingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    revisionLevel?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchaseOrder?: PurchaseOrderUpdateOneRequiredWithoutLineItemsNestedInput
    fileAttachments?: FileAttachmentUpdateManyWithoutLineItemNestedInput
    batches?: BatchUpdateManyWithoutLineItemNestedInput
  }

  export type OrderLineItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    drawingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    revisionLevel?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fileAttachments?: FileAttachmentUncheckedUpdateManyWithoutLineItemNestedInput
    batches?: BatchUncheckedUpdateManyWithoutLineItemNestedInput
  }

  export type OrderLineItemCreateManyInput = {
    id?: string
    orderId: string
    partNumber: string
    partName: string
    drawingNumber?: string | null
    revisionLevel?: string | null
    quantity: number
    dueDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderLineItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    drawingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    revisionLevel?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderLineItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    drawingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    revisionLevel?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileAttachmentCreateInput = {
    id?: string
    fileName: string
    fileType: string
    fileUrl: string
    uploadedBy: string
    description?: string | null
    createdAt?: Date | string
    lineItem: OrderLineItemCreateNestedOneWithoutFileAttachmentsInput
  }

  export type FileAttachmentUncheckedCreateInput = {
    id?: string
    lineItemId: string
    fileName: string
    fileType: string
    fileUrl: string
    uploadedBy: string
    description?: string | null
    createdAt?: Date | string
  }

  export type FileAttachmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lineItem?: OrderLineItemUpdateOneRequiredWithoutFileAttachmentsNestedInput
  }

  export type FileAttachmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    lineItemId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileAttachmentCreateManyInput = {
    id?: string
    lineItemId: string
    fileName: string
    fileType: string
    fileUrl: string
    uploadedBy: string
    description?: string | null
    createdAt?: Date | string
  }

  export type FileAttachmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileAttachmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    lineItemId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BatchCreateInput = {
    id?: string
    batchId: string
    quantity: number
    startDate?: Date | string | null
    estimatedCompletion?: Date | string | null
    actualCompletion?: Date | string | null
    priority?: $Enums.BatchPriority
    status?: $Enums.BatchStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lineItem: OrderLineItemCreateNestedOneWithoutBatchesInput
    routingSteps?: RoutingStepCreateNestedManyWithoutBatchInput
    qcRecords?: QCRecordCreateNestedManyWithoutBatchInput
  }

  export type BatchUncheckedCreateInput = {
    id?: string
    batchId: string
    lineItemId: string
    quantity: number
    startDate?: Date | string | null
    estimatedCompletion?: Date | string | null
    actualCompletion?: Date | string | null
    priority?: $Enums.BatchPriority
    status?: $Enums.BatchStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    routingSteps?: RoutingStepUncheckedCreateNestedManyWithoutBatchInput
    qcRecords?: QCRecordUncheckedCreateNestedManyWithoutBatchInput
  }

  export type BatchUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedCompletion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualCompletion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumBatchPriorityFieldUpdateOperationsInput | $Enums.BatchPriority
    status?: EnumBatchStatusFieldUpdateOperationsInput | $Enums.BatchStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lineItem?: OrderLineItemUpdateOneRequiredWithoutBatchesNestedInput
    routingSteps?: RoutingStepUpdateManyWithoutBatchNestedInput
    qcRecords?: QCRecordUpdateManyWithoutBatchNestedInput
  }

  export type BatchUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    lineItemId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedCompletion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualCompletion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumBatchPriorityFieldUpdateOperationsInput | $Enums.BatchPriority
    status?: EnumBatchStatusFieldUpdateOperationsInput | $Enums.BatchStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    routingSteps?: RoutingStepUncheckedUpdateManyWithoutBatchNestedInput
    qcRecords?: QCRecordUncheckedUpdateManyWithoutBatchNestedInput
  }

  export type BatchCreateManyInput = {
    id?: string
    batchId: string
    lineItemId: string
    quantity: number
    startDate?: Date | string | null
    estimatedCompletion?: Date | string | null
    actualCompletion?: Date | string | null
    priority?: $Enums.BatchPriority
    status?: $Enums.BatchStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BatchUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedCompletion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualCompletion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumBatchPriorityFieldUpdateOperationsInput | $Enums.BatchPriority
    status?: EnumBatchStatusFieldUpdateOperationsInput | $Enums.BatchStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BatchUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    lineItemId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedCompletion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualCompletion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumBatchPriorityFieldUpdateOperationsInput | $Enums.BatchPriority
    status?: EnumBatchStatusFieldUpdateOperationsInput | $Enums.BatchStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoutingStepCreateInput = {
    id?: string
    stepNumber: number
    description: string
    required?: boolean
    estimatedTime?: number | null
    notes?: string | null
    status?: $Enums.StepStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    batch: BatchCreateNestedOneWithoutRoutingStepsInput
    workstation: WorkstationCreateNestedOneWithoutRoutingStepsInput
    confirmations?: StepConfirmationCreateNestedManyWithoutRoutingStepInput
  }

  export type RoutingStepUncheckedCreateInput = {
    id?: string
    batchId: string
    stepNumber: number
    workstationId: string
    description: string
    required?: boolean
    estimatedTime?: number | null
    notes?: string | null
    status?: $Enums.StepStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    confirmations?: StepConfirmationUncheckedCreateNestedManyWithoutRoutingStepInput
  }

  export type RoutingStepUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepNumber?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStepStatusFieldUpdateOperationsInput | $Enums.StepStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    batch?: BatchUpdateOneRequiredWithoutRoutingStepsNestedInput
    workstation?: WorkstationUpdateOneRequiredWithoutRoutingStepsNestedInput
    confirmations?: StepConfirmationUpdateManyWithoutRoutingStepNestedInput
  }

  export type RoutingStepUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    stepNumber?: IntFieldUpdateOperationsInput | number
    workstationId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStepStatusFieldUpdateOperationsInput | $Enums.StepStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmations?: StepConfirmationUncheckedUpdateManyWithoutRoutingStepNestedInput
  }

  export type RoutingStepCreateManyInput = {
    id?: string
    batchId: string
    stepNumber: number
    workstationId: string
    description: string
    required?: boolean
    estimatedTime?: number | null
    notes?: string | null
    status?: $Enums.StepStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoutingStepUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepNumber?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStepStatusFieldUpdateOperationsInput | $Enums.StepStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoutingStepUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    stepNumber?: IntFieldUpdateOperationsInput | number
    workstationId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStepStatusFieldUpdateOperationsInput | $Enums.StepStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkstationCreateInput = {
    id?: string
    name: string
    description?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    routingSteps?: RoutingStepCreateNestedManyWithoutWorkstationInput
    confirmations?: StepConfirmationCreateNestedManyWithoutWorkstationInput
  }

  export type WorkstationUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    routingSteps?: RoutingStepUncheckedCreateNestedManyWithoutWorkstationInput
    confirmations?: StepConfirmationUncheckedCreateNestedManyWithoutWorkstationInput
  }

  export type WorkstationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    routingSteps?: RoutingStepUpdateManyWithoutWorkstationNestedInput
    confirmations?: StepConfirmationUpdateManyWithoutWorkstationNestedInput
  }

  export type WorkstationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    routingSteps?: RoutingStepUncheckedUpdateManyWithoutWorkstationNestedInput
    confirmations?: StepConfirmationUncheckedUpdateManyWithoutWorkstationNestedInput
  }

  export type WorkstationCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkstationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkstationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StepConfirmationCreateInput = {
    id?: string
    operatorName: string
    operatorId?: string | null
    startTime?: Date | string | null
    endTime?: Date | string | null
    notes?: string | null
    photoUrl?: string | null
    flagged?: boolean
    status?: $Enums.ConfirmationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    routingStep: RoutingStepCreateNestedOneWithoutConfirmationsInput
    workstation: WorkstationCreateNestedOneWithoutConfirmationsInput
  }

  export type StepConfirmationUncheckedCreateInput = {
    id?: string
    stepId: string
    workstationId: string
    operatorName: string
    operatorId?: string | null
    startTime?: Date | string | null
    endTime?: Date | string | null
    notes?: string | null
    photoUrl?: string | null
    flagged?: boolean
    status?: $Enums.ConfirmationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StepConfirmationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    operatorName?: StringFieldUpdateOperationsInput | string
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    flagged?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumConfirmationStatusFieldUpdateOperationsInput | $Enums.ConfirmationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    routingStep?: RoutingStepUpdateOneRequiredWithoutConfirmationsNestedInput
    workstation?: WorkstationUpdateOneRequiredWithoutConfirmationsNestedInput
  }

  export type StepConfirmationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepId?: StringFieldUpdateOperationsInput | string
    workstationId?: StringFieldUpdateOperationsInput | string
    operatorName?: StringFieldUpdateOperationsInput | string
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    flagged?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumConfirmationStatusFieldUpdateOperationsInput | $Enums.ConfirmationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StepConfirmationCreateManyInput = {
    id?: string
    stepId: string
    workstationId: string
    operatorName: string
    operatorId?: string | null
    startTime?: Date | string | null
    endTime?: Date | string | null
    notes?: string | null
    photoUrl?: string | null
    flagged?: boolean
    status?: $Enums.ConfirmationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StepConfirmationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    operatorName?: StringFieldUpdateOperationsInput | string
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    flagged?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumConfirmationStatusFieldUpdateOperationsInput | $Enums.ConfirmationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StepConfirmationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepId?: StringFieldUpdateOperationsInput | string
    workstationId?: StringFieldUpdateOperationsInput | string
    operatorName?: StringFieldUpdateOperationsInput | string
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    flagged?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumConfirmationStatusFieldUpdateOperationsInput | $Enums.ConfirmationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QCRecordCreateInput = {
    id?: string
    inspector: string
    inspectionDate?: Date | string
    result: $Enums.QCResult
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    batch: BatchCreateNestedOneWithoutQcRecordsInput
  }

  export type QCRecordUncheckedCreateInput = {
    id?: string
    batchId: string
    inspector: string
    inspectionDate?: Date | string
    result: $Enums.QCResult
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QCRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    inspector?: StringFieldUpdateOperationsInput | string
    inspectionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    result?: EnumQCResultFieldUpdateOperationsInput | $Enums.QCResult
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    batch?: BatchUpdateOneRequiredWithoutQcRecordsNestedInput
  }

  export type QCRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    inspector?: StringFieldUpdateOperationsInput | string
    inspectionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    result?: EnumQCResultFieldUpdateOperationsInput | $Enums.QCResult
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QCRecordCreateManyInput = {
    id?: string
    batchId: string
    inspector: string
    inspectionDate?: Date | string
    result: $Enums.QCResult
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QCRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    inspector?: StringFieldUpdateOperationsInput | string
    inspectionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    result?: EnumQCResultFieldUpdateOperationsInput | $Enums.QCResult
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QCRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    inspector?: StringFieldUpdateOperationsInput | string
    inspectionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    result?: EnumQCResultFieldUpdateOperationsInput | $Enums.QCResult
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumSyncStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SyncStatus | EnumSyncStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SyncStatus[] | ListEnumSyncStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SyncStatus[] | ListEnumSyncStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSyncStatusFilter<$PrismaModel> | $Enums.SyncStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PurchaseOrderListRelationFilter = {
    every?: PurchaseOrderWhereInput
    some?: PurchaseOrderWhereInput
    none?: PurchaseOrderWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PurchaseOrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CustomerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    contactName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    billingAddress?: SortOrder
    shippingAddress?: SortOrder
    notes?: SortOrder
    quickbooksId?: SortOrder
    syncStatus?: SortOrder
    lastSyncedAt?: SortOrder
    syncError?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    contactName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    billingAddress?: SortOrder
    shippingAddress?: SortOrder
    notes?: SortOrder
    quickbooksId?: SortOrder
    syncStatus?: SortOrder
    lastSyncedAt?: SortOrder
    syncError?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    contactName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    billingAddress?: SortOrder
    shippingAddress?: SortOrder
    notes?: SortOrder
    quickbooksId?: SortOrder
    syncStatus?: SortOrder
    lastSyncedAt?: SortOrder
    syncError?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumSyncStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SyncStatus | EnumSyncStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SyncStatus[] | ListEnumSyncStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SyncStatus[] | ListEnumSyncStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSyncStatusWithAggregatesFilter<$PrismaModel> | $Enums.SyncStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSyncStatusFilter<$PrismaModel>
    _max?: NestedEnumSyncStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumOrderPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderPriority | EnumOrderPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.OrderPriority[] | ListEnumOrderPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderPriority[] | ListEnumOrderPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderPriorityFilter<$PrismaModel> | $Enums.OrderPriority
  }

  export type CustomerScalarRelationFilter = {
    is?: CustomerWhereInput
    isNot?: CustomerWhereInput
  }

  export type OrderLineItemListRelationFilter = {
    every?: OrderLineItemWhereInput
    some?: OrderLineItemWhereInput
    none?: OrderLineItemWhereInput
  }

  export type OrderLineItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PurchaseOrderCountOrderByAggregateInput = {
    id?: SortOrder
    systemOrderId?: SortOrder
    customerId?: SortOrder
    poNumber?: SortOrder
    dueDate?: SortOrder
    priority?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PurchaseOrderMaxOrderByAggregateInput = {
    id?: SortOrder
    systemOrderId?: SortOrder
    customerId?: SortOrder
    poNumber?: SortOrder
    dueDate?: SortOrder
    priority?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PurchaseOrderMinOrderByAggregateInput = {
    id?: SortOrder
    systemOrderId?: SortOrder
    customerId?: SortOrder
    poNumber?: SortOrder
    dueDate?: SortOrder
    priority?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumOrderPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderPriority | EnumOrderPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.OrderPriority[] | ListEnumOrderPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderPriority[] | ListEnumOrderPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderPriorityWithAggregatesFilter<$PrismaModel> | $Enums.OrderPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderPriorityFilter<$PrismaModel>
    _max?: NestedEnumOrderPriorityFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type PurchaseOrderScalarRelationFilter = {
    is?: PurchaseOrderWhereInput
    isNot?: PurchaseOrderWhereInput
  }

  export type FileAttachmentListRelationFilter = {
    every?: FileAttachmentWhereInput
    some?: FileAttachmentWhereInput
    none?: FileAttachmentWhereInput
  }

  export type BatchListRelationFilter = {
    every?: BatchWhereInput
    some?: BatchWhereInput
    none?: BatchWhereInput
  }

  export type FileAttachmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BatchOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderLineItemCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    partNumber?: SortOrder
    partName?: SortOrder
    drawingNumber?: SortOrder
    revisionLevel?: SortOrder
    quantity?: SortOrder
    dueDate?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderLineItemAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type OrderLineItemMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    partNumber?: SortOrder
    partName?: SortOrder
    drawingNumber?: SortOrder
    revisionLevel?: SortOrder
    quantity?: SortOrder
    dueDate?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderLineItemMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    partNumber?: SortOrder
    partName?: SortOrder
    drawingNumber?: SortOrder
    revisionLevel?: SortOrder
    quantity?: SortOrder
    dueDate?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderLineItemSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type OrderLineItemScalarRelationFilter = {
    is?: OrderLineItemWhereInput
    isNot?: OrderLineItemWhereInput
  }

  export type FileAttachmentCountOrderByAggregateInput = {
    id?: SortOrder
    lineItemId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileUrl?: SortOrder
    uploadedBy?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type FileAttachmentMaxOrderByAggregateInput = {
    id?: SortOrder
    lineItemId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileUrl?: SortOrder
    uploadedBy?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type FileAttachmentMinOrderByAggregateInput = {
    id?: SortOrder
    lineItemId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileUrl?: SortOrder
    uploadedBy?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumBatchPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.BatchPriority | EnumBatchPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.BatchPriority[] | ListEnumBatchPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.BatchPriority[] | ListEnumBatchPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumBatchPriorityFilter<$PrismaModel> | $Enums.BatchPriority
  }

  export type EnumBatchStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BatchStatus | EnumBatchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BatchStatus[] | ListEnumBatchStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BatchStatus[] | ListEnumBatchStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBatchStatusFilter<$PrismaModel> | $Enums.BatchStatus
  }

  export type RoutingStepListRelationFilter = {
    every?: RoutingStepWhereInput
    some?: RoutingStepWhereInput
    none?: RoutingStepWhereInput
  }

  export type QCRecordListRelationFilter = {
    every?: QCRecordWhereInput
    some?: QCRecordWhereInput
    none?: QCRecordWhereInput
  }

  export type RoutingStepOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QCRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BatchCountOrderByAggregateInput = {
    id?: SortOrder
    batchId?: SortOrder
    lineItemId?: SortOrder
    quantity?: SortOrder
    startDate?: SortOrder
    estimatedCompletion?: SortOrder
    actualCompletion?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BatchAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type BatchMaxOrderByAggregateInput = {
    id?: SortOrder
    batchId?: SortOrder
    lineItemId?: SortOrder
    quantity?: SortOrder
    startDate?: SortOrder
    estimatedCompletion?: SortOrder
    actualCompletion?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BatchMinOrderByAggregateInput = {
    id?: SortOrder
    batchId?: SortOrder
    lineItemId?: SortOrder
    quantity?: SortOrder
    startDate?: SortOrder
    estimatedCompletion?: SortOrder
    actualCompletion?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BatchSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type EnumBatchPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BatchPriority | EnumBatchPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.BatchPriority[] | ListEnumBatchPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.BatchPriority[] | ListEnumBatchPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumBatchPriorityWithAggregatesFilter<$PrismaModel> | $Enums.BatchPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBatchPriorityFilter<$PrismaModel>
    _max?: NestedEnumBatchPriorityFilter<$PrismaModel>
  }

  export type EnumBatchStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BatchStatus | EnumBatchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BatchStatus[] | ListEnumBatchStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BatchStatus[] | ListEnumBatchStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBatchStatusWithAggregatesFilter<$PrismaModel> | $Enums.BatchStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBatchStatusFilter<$PrismaModel>
    _max?: NestedEnumBatchStatusFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumStepStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StepStatus | EnumStepStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StepStatus[] | ListEnumStepStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StepStatus[] | ListEnumStepStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStepStatusFilter<$PrismaModel> | $Enums.StepStatus
  }

  export type BatchScalarRelationFilter = {
    is?: BatchWhereInput
    isNot?: BatchWhereInput
  }

  export type WorkstationScalarRelationFilter = {
    is?: WorkstationWhereInput
    isNot?: WorkstationWhereInput
  }

  export type StepConfirmationListRelationFilter = {
    every?: StepConfirmationWhereInput
    some?: StepConfirmationWhereInput
    none?: StepConfirmationWhereInput
  }

  export type StepConfirmationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoutingStepBatchIdStepNumberCompoundUniqueInput = {
    batchId: string
    stepNumber: number
  }

  export type RoutingStepCountOrderByAggregateInput = {
    id?: SortOrder
    batchId?: SortOrder
    stepNumber?: SortOrder
    workstationId?: SortOrder
    description?: SortOrder
    required?: SortOrder
    estimatedTime?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoutingStepAvgOrderByAggregateInput = {
    stepNumber?: SortOrder
    estimatedTime?: SortOrder
  }

  export type RoutingStepMaxOrderByAggregateInput = {
    id?: SortOrder
    batchId?: SortOrder
    stepNumber?: SortOrder
    workstationId?: SortOrder
    description?: SortOrder
    required?: SortOrder
    estimatedTime?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoutingStepMinOrderByAggregateInput = {
    id?: SortOrder
    batchId?: SortOrder
    stepNumber?: SortOrder
    workstationId?: SortOrder
    description?: SortOrder
    required?: SortOrder
    estimatedTime?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoutingStepSumOrderByAggregateInput = {
    stepNumber?: SortOrder
    estimatedTime?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumStepStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StepStatus | EnumStepStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StepStatus[] | ListEnumStepStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StepStatus[] | ListEnumStepStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStepStatusWithAggregatesFilter<$PrismaModel> | $Enums.StepStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStepStatusFilter<$PrismaModel>
    _max?: NestedEnumStepStatusFilter<$PrismaModel>
  }

  export type WorkstationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkstationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkstationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumConfirmationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ConfirmationStatus | EnumConfirmationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConfirmationStatus[] | ListEnumConfirmationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConfirmationStatus[] | ListEnumConfirmationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConfirmationStatusFilter<$PrismaModel> | $Enums.ConfirmationStatus
  }

  export type RoutingStepScalarRelationFilter = {
    is?: RoutingStepWhereInput
    isNot?: RoutingStepWhereInput
  }

  export type StepConfirmationCountOrderByAggregateInput = {
    id?: SortOrder
    stepId?: SortOrder
    workstationId?: SortOrder
    operatorName?: SortOrder
    operatorId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    notes?: SortOrder
    photoUrl?: SortOrder
    flagged?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StepConfirmationMaxOrderByAggregateInput = {
    id?: SortOrder
    stepId?: SortOrder
    workstationId?: SortOrder
    operatorName?: SortOrder
    operatorId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    notes?: SortOrder
    photoUrl?: SortOrder
    flagged?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StepConfirmationMinOrderByAggregateInput = {
    id?: SortOrder
    stepId?: SortOrder
    workstationId?: SortOrder
    operatorName?: SortOrder
    operatorId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    notes?: SortOrder
    photoUrl?: SortOrder
    flagged?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumConfirmationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConfirmationStatus | EnumConfirmationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConfirmationStatus[] | ListEnumConfirmationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConfirmationStatus[] | ListEnumConfirmationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConfirmationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ConfirmationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConfirmationStatusFilter<$PrismaModel>
    _max?: NestedEnumConfirmationStatusFilter<$PrismaModel>
  }

  export type EnumQCResultFilter<$PrismaModel = never> = {
    equals?: $Enums.QCResult | EnumQCResultFieldRefInput<$PrismaModel>
    in?: $Enums.QCResult[] | ListEnumQCResultFieldRefInput<$PrismaModel>
    notIn?: $Enums.QCResult[] | ListEnumQCResultFieldRefInput<$PrismaModel>
    not?: NestedEnumQCResultFilter<$PrismaModel> | $Enums.QCResult
  }

  export type QCRecordCountOrderByAggregateInput = {
    id?: SortOrder
    batchId?: SortOrder
    inspector?: SortOrder
    inspectionDate?: SortOrder
    result?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QCRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    batchId?: SortOrder
    inspector?: SortOrder
    inspectionDate?: SortOrder
    result?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QCRecordMinOrderByAggregateInput = {
    id?: SortOrder
    batchId?: SortOrder
    inspector?: SortOrder
    inspectionDate?: SortOrder
    result?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumQCResultWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QCResult | EnumQCResultFieldRefInput<$PrismaModel>
    in?: $Enums.QCResult[] | ListEnumQCResultFieldRefInput<$PrismaModel>
    notIn?: $Enums.QCResult[] | ListEnumQCResultFieldRefInput<$PrismaModel>
    not?: NestedEnumQCResultWithAggregatesFilter<$PrismaModel> | $Enums.QCResult
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQCResultFilter<$PrismaModel>
    _max?: NestedEnumQCResultFilter<$PrismaModel>
  }

  export type PurchaseOrderCreateNestedManyWithoutCustomerInput = {
    create?: XOR<PurchaseOrderCreateWithoutCustomerInput, PurchaseOrderUncheckedCreateWithoutCustomerInput> | PurchaseOrderCreateWithoutCustomerInput[] | PurchaseOrderUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: PurchaseOrderCreateOrConnectWithoutCustomerInput | PurchaseOrderCreateOrConnectWithoutCustomerInput[]
    createMany?: PurchaseOrderCreateManyCustomerInputEnvelope
    connect?: PurchaseOrderWhereUniqueInput | PurchaseOrderWhereUniqueInput[]
  }

  export type PurchaseOrderUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<PurchaseOrderCreateWithoutCustomerInput, PurchaseOrderUncheckedCreateWithoutCustomerInput> | PurchaseOrderCreateWithoutCustomerInput[] | PurchaseOrderUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: PurchaseOrderCreateOrConnectWithoutCustomerInput | PurchaseOrderCreateOrConnectWithoutCustomerInput[]
    createMany?: PurchaseOrderCreateManyCustomerInputEnvelope
    connect?: PurchaseOrderWhereUniqueInput | PurchaseOrderWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumSyncStatusFieldUpdateOperationsInput = {
    set?: $Enums.SyncStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PurchaseOrderUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<PurchaseOrderCreateWithoutCustomerInput, PurchaseOrderUncheckedCreateWithoutCustomerInput> | PurchaseOrderCreateWithoutCustomerInput[] | PurchaseOrderUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: PurchaseOrderCreateOrConnectWithoutCustomerInput | PurchaseOrderCreateOrConnectWithoutCustomerInput[]
    upsert?: PurchaseOrderUpsertWithWhereUniqueWithoutCustomerInput | PurchaseOrderUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: PurchaseOrderCreateManyCustomerInputEnvelope
    set?: PurchaseOrderWhereUniqueInput | PurchaseOrderWhereUniqueInput[]
    disconnect?: PurchaseOrderWhereUniqueInput | PurchaseOrderWhereUniqueInput[]
    delete?: PurchaseOrderWhereUniqueInput | PurchaseOrderWhereUniqueInput[]
    connect?: PurchaseOrderWhereUniqueInput | PurchaseOrderWhereUniqueInput[]
    update?: PurchaseOrderUpdateWithWhereUniqueWithoutCustomerInput | PurchaseOrderUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: PurchaseOrderUpdateManyWithWhereWithoutCustomerInput | PurchaseOrderUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: PurchaseOrderScalarWhereInput | PurchaseOrderScalarWhereInput[]
  }

  export type PurchaseOrderUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<PurchaseOrderCreateWithoutCustomerInput, PurchaseOrderUncheckedCreateWithoutCustomerInput> | PurchaseOrderCreateWithoutCustomerInput[] | PurchaseOrderUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: PurchaseOrderCreateOrConnectWithoutCustomerInput | PurchaseOrderCreateOrConnectWithoutCustomerInput[]
    upsert?: PurchaseOrderUpsertWithWhereUniqueWithoutCustomerInput | PurchaseOrderUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: PurchaseOrderCreateManyCustomerInputEnvelope
    set?: PurchaseOrderWhereUniqueInput | PurchaseOrderWhereUniqueInput[]
    disconnect?: PurchaseOrderWhereUniqueInput | PurchaseOrderWhereUniqueInput[]
    delete?: PurchaseOrderWhereUniqueInput | PurchaseOrderWhereUniqueInput[]
    connect?: PurchaseOrderWhereUniqueInput | PurchaseOrderWhereUniqueInput[]
    update?: PurchaseOrderUpdateWithWhereUniqueWithoutCustomerInput | PurchaseOrderUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: PurchaseOrderUpdateManyWithWhereWithoutCustomerInput | PurchaseOrderUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: PurchaseOrderScalarWhereInput | PurchaseOrderScalarWhereInput[]
  }

  export type CustomerCreateNestedOneWithoutPurchaseOrdersInput = {
    create?: XOR<CustomerCreateWithoutPurchaseOrdersInput, CustomerUncheckedCreateWithoutPurchaseOrdersInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutPurchaseOrdersInput
    connect?: CustomerWhereUniqueInput
  }

  export type OrderLineItemCreateNestedManyWithoutPurchaseOrderInput = {
    create?: XOR<OrderLineItemCreateWithoutPurchaseOrderInput, OrderLineItemUncheckedCreateWithoutPurchaseOrderInput> | OrderLineItemCreateWithoutPurchaseOrderInput[] | OrderLineItemUncheckedCreateWithoutPurchaseOrderInput[]
    connectOrCreate?: OrderLineItemCreateOrConnectWithoutPurchaseOrderInput | OrderLineItemCreateOrConnectWithoutPurchaseOrderInput[]
    createMany?: OrderLineItemCreateManyPurchaseOrderInputEnvelope
    connect?: OrderLineItemWhereUniqueInput | OrderLineItemWhereUniqueInput[]
  }

  export type OrderLineItemUncheckedCreateNestedManyWithoutPurchaseOrderInput = {
    create?: XOR<OrderLineItemCreateWithoutPurchaseOrderInput, OrderLineItemUncheckedCreateWithoutPurchaseOrderInput> | OrderLineItemCreateWithoutPurchaseOrderInput[] | OrderLineItemUncheckedCreateWithoutPurchaseOrderInput[]
    connectOrCreate?: OrderLineItemCreateOrConnectWithoutPurchaseOrderInput | OrderLineItemCreateOrConnectWithoutPurchaseOrderInput[]
    createMany?: OrderLineItemCreateManyPurchaseOrderInputEnvelope
    connect?: OrderLineItemWhereUniqueInput | OrderLineItemWhereUniqueInput[]
  }

  export type EnumOrderPriorityFieldUpdateOperationsInput = {
    set?: $Enums.OrderPriority
  }

  export type CustomerUpdateOneRequiredWithoutPurchaseOrdersNestedInput = {
    create?: XOR<CustomerCreateWithoutPurchaseOrdersInput, CustomerUncheckedCreateWithoutPurchaseOrdersInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutPurchaseOrdersInput
    upsert?: CustomerUpsertWithoutPurchaseOrdersInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutPurchaseOrdersInput, CustomerUpdateWithoutPurchaseOrdersInput>, CustomerUncheckedUpdateWithoutPurchaseOrdersInput>
  }

  export type OrderLineItemUpdateManyWithoutPurchaseOrderNestedInput = {
    create?: XOR<OrderLineItemCreateWithoutPurchaseOrderInput, OrderLineItemUncheckedCreateWithoutPurchaseOrderInput> | OrderLineItemCreateWithoutPurchaseOrderInput[] | OrderLineItemUncheckedCreateWithoutPurchaseOrderInput[]
    connectOrCreate?: OrderLineItemCreateOrConnectWithoutPurchaseOrderInput | OrderLineItemCreateOrConnectWithoutPurchaseOrderInput[]
    upsert?: OrderLineItemUpsertWithWhereUniqueWithoutPurchaseOrderInput | OrderLineItemUpsertWithWhereUniqueWithoutPurchaseOrderInput[]
    createMany?: OrderLineItemCreateManyPurchaseOrderInputEnvelope
    set?: OrderLineItemWhereUniqueInput | OrderLineItemWhereUniqueInput[]
    disconnect?: OrderLineItemWhereUniqueInput | OrderLineItemWhereUniqueInput[]
    delete?: OrderLineItemWhereUniqueInput | OrderLineItemWhereUniqueInput[]
    connect?: OrderLineItemWhereUniqueInput | OrderLineItemWhereUniqueInput[]
    update?: OrderLineItemUpdateWithWhereUniqueWithoutPurchaseOrderInput | OrderLineItemUpdateWithWhereUniqueWithoutPurchaseOrderInput[]
    updateMany?: OrderLineItemUpdateManyWithWhereWithoutPurchaseOrderInput | OrderLineItemUpdateManyWithWhereWithoutPurchaseOrderInput[]
    deleteMany?: OrderLineItemScalarWhereInput | OrderLineItemScalarWhereInput[]
  }

  export type OrderLineItemUncheckedUpdateManyWithoutPurchaseOrderNestedInput = {
    create?: XOR<OrderLineItemCreateWithoutPurchaseOrderInput, OrderLineItemUncheckedCreateWithoutPurchaseOrderInput> | OrderLineItemCreateWithoutPurchaseOrderInput[] | OrderLineItemUncheckedCreateWithoutPurchaseOrderInput[]
    connectOrCreate?: OrderLineItemCreateOrConnectWithoutPurchaseOrderInput | OrderLineItemCreateOrConnectWithoutPurchaseOrderInput[]
    upsert?: OrderLineItemUpsertWithWhereUniqueWithoutPurchaseOrderInput | OrderLineItemUpsertWithWhereUniqueWithoutPurchaseOrderInput[]
    createMany?: OrderLineItemCreateManyPurchaseOrderInputEnvelope
    set?: OrderLineItemWhereUniqueInput | OrderLineItemWhereUniqueInput[]
    disconnect?: OrderLineItemWhereUniqueInput | OrderLineItemWhereUniqueInput[]
    delete?: OrderLineItemWhereUniqueInput | OrderLineItemWhereUniqueInput[]
    connect?: OrderLineItemWhereUniqueInput | OrderLineItemWhereUniqueInput[]
    update?: OrderLineItemUpdateWithWhereUniqueWithoutPurchaseOrderInput | OrderLineItemUpdateWithWhereUniqueWithoutPurchaseOrderInput[]
    updateMany?: OrderLineItemUpdateManyWithWhereWithoutPurchaseOrderInput | OrderLineItemUpdateManyWithWhereWithoutPurchaseOrderInput[]
    deleteMany?: OrderLineItemScalarWhereInput | OrderLineItemScalarWhereInput[]
  }

  export type PurchaseOrderCreateNestedOneWithoutLineItemsInput = {
    create?: XOR<PurchaseOrderCreateWithoutLineItemsInput, PurchaseOrderUncheckedCreateWithoutLineItemsInput>
    connectOrCreate?: PurchaseOrderCreateOrConnectWithoutLineItemsInput
    connect?: PurchaseOrderWhereUniqueInput
  }

  export type FileAttachmentCreateNestedManyWithoutLineItemInput = {
    create?: XOR<FileAttachmentCreateWithoutLineItemInput, FileAttachmentUncheckedCreateWithoutLineItemInput> | FileAttachmentCreateWithoutLineItemInput[] | FileAttachmentUncheckedCreateWithoutLineItemInput[]
    connectOrCreate?: FileAttachmentCreateOrConnectWithoutLineItemInput | FileAttachmentCreateOrConnectWithoutLineItemInput[]
    createMany?: FileAttachmentCreateManyLineItemInputEnvelope
    connect?: FileAttachmentWhereUniqueInput | FileAttachmentWhereUniqueInput[]
  }

  export type BatchCreateNestedManyWithoutLineItemInput = {
    create?: XOR<BatchCreateWithoutLineItemInput, BatchUncheckedCreateWithoutLineItemInput> | BatchCreateWithoutLineItemInput[] | BatchUncheckedCreateWithoutLineItemInput[]
    connectOrCreate?: BatchCreateOrConnectWithoutLineItemInput | BatchCreateOrConnectWithoutLineItemInput[]
    createMany?: BatchCreateManyLineItemInputEnvelope
    connect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
  }

  export type FileAttachmentUncheckedCreateNestedManyWithoutLineItemInput = {
    create?: XOR<FileAttachmentCreateWithoutLineItemInput, FileAttachmentUncheckedCreateWithoutLineItemInput> | FileAttachmentCreateWithoutLineItemInput[] | FileAttachmentUncheckedCreateWithoutLineItemInput[]
    connectOrCreate?: FileAttachmentCreateOrConnectWithoutLineItemInput | FileAttachmentCreateOrConnectWithoutLineItemInput[]
    createMany?: FileAttachmentCreateManyLineItemInputEnvelope
    connect?: FileAttachmentWhereUniqueInput | FileAttachmentWhereUniqueInput[]
  }

  export type BatchUncheckedCreateNestedManyWithoutLineItemInput = {
    create?: XOR<BatchCreateWithoutLineItemInput, BatchUncheckedCreateWithoutLineItemInput> | BatchCreateWithoutLineItemInput[] | BatchUncheckedCreateWithoutLineItemInput[]
    connectOrCreate?: BatchCreateOrConnectWithoutLineItemInput | BatchCreateOrConnectWithoutLineItemInput[]
    createMany?: BatchCreateManyLineItemInputEnvelope
    connect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PurchaseOrderUpdateOneRequiredWithoutLineItemsNestedInput = {
    create?: XOR<PurchaseOrderCreateWithoutLineItemsInput, PurchaseOrderUncheckedCreateWithoutLineItemsInput>
    connectOrCreate?: PurchaseOrderCreateOrConnectWithoutLineItemsInput
    upsert?: PurchaseOrderUpsertWithoutLineItemsInput
    connect?: PurchaseOrderWhereUniqueInput
    update?: XOR<XOR<PurchaseOrderUpdateToOneWithWhereWithoutLineItemsInput, PurchaseOrderUpdateWithoutLineItemsInput>, PurchaseOrderUncheckedUpdateWithoutLineItemsInput>
  }

  export type FileAttachmentUpdateManyWithoutLineItemNestedInput = {
    create?: XOR<FileAttachmentCreateWithoutLineItemInput, FileAttachmentUncheckedCreateWithoutLineItemInput> | FileAttachmentCreateWithoutLineItemInput[] | FileAttachmentUncheckedCreateWithoutLineItemInput[]
    connectOrCreate?: FileAttachmentCreateOrConnectWithoutLineItemInput | FileAttachmentCreateOrConnectWithoutLineItemInput[]
    upsert?: FileAttachmentUpsertWithWhereUniqueWithoutLineItemInput | FileAttachmentUpsertWithWhereUniqueWithoutLineItemInput[]
    createMany?: FileAttachmentCreateManyLineItemInputEnvelope
    set?: FileAttachmentWhereUniqueInput | FileAttachmentWhereUniqueInput[]
    disconnect?: FileAttachmentWhereUniqueInput | FileAttachmentWhereUniqueInput[]
    delete?: FileAttachmentWhereUniqueInput | FileAttachmentWhereUniqueInput[]
    connect?: FileAttachmentWhereUniqueInput | FileAttachmentWhereUniqueInput[]
    update?: FileAttachmentUpdateWithWhereUniqueWithoutLineItemInput | FileAttachmentUpdateWithWhereUniqueWithoutLineItemInput[]
    updateMany?: FileAttachmentUpdateManyWithWhereWithoutLineItemInput | FileAttachmentUpdateManyWithWhereWithoutLineItemInput[]
    deleteMany?: FileAttachmentScalarWhereInput | FileAttachmentScalarWhereInput[]
  }

  export type BatchUpdateManyWithoutLineItemNestedInput = {
    create?: XOR<BatchCreateWithoutLineItemInput, BatchUncheckedCreateWithoutLineItemInput> | BatchCreateWithoutLineItemInput[] | BatchUncheckedCreateWithoutLineItemInput[]
    connectOrCreate?: BatchCreateOrConnectWithoutLineItemInput | BatchCreateOrConnectWithoutLineItemInput[]
    upsert?: BatchUpsertWithWhereUniqueWithoutLineItemInput | BatchUpsertWithWhereUniqueWithoutLineItemInput[]
    createMany?: BatchCreateManyLineItemInputEnvelope
    set?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    disconnect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    delete?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    connect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    update?: BatchUpdateWithWhereUniqueWithoutLineItemInput | BatchUpdateWithWhereUniqueWithoutLineItemInput[]
    updateMany?: BatchUpdateManyWithWhereWithoutLineItemInput | BatchUpdateManyWithWhereWithoutLineItemInput[]
    deleteMany?: BatchScalarWhereInput | BatchScalarWhereInput[]
  }

  export type FileAttachmentUncheckedUpdateManyWithoutLineItemNestedInput = {
    create?: XOR<FileAttachmentCreateWithoutLineItemInput, FileAttachmentUncheckedCreateWithoutLineItemInput> | FileAttachmentCreateWithoutLineItemInput[] | FileAttachmentUncheckedCreateWithoutLineItemInput[]
    connectOrCreate?: FileAttachmentCreateOrConnectWithoutLineItemInput | FileAttachmentCreateOrConnectWithoutLineItemInput[]
    upsert?: FileAttachmentUpsertWithWhereUniqueWithoutLineItemInput | FileAttachmentUpsertWithWhereUniqueWithoutLineItemInput[]
    createMany?: FileAttachmentCreateManyLineItemInputEnvelope
    set?: FileAttachmentWhereUniqueInput | FileAttachmentWhereUniqueInput[]
    disconnect?: FileAttachmentWhereUniqueInput | FileAttachmentWhereUniqueInput[]
    delete?: FileAttachmentWhereUniqueInput | FileAttachmentWhereUniqueInput[]
    connect?: FileAttachmentWhereUniqueInput | FileAttachmentWhereUniqueInput[]
    update?: FileAttachmentUpdateWithWhereUniqueWithoutLineItemInput | FileAttachmentUpdateWithWhereUniqueWithoutLineItemInput[]
    updateMany?: FileAttachmentUpdateManyWithWhereWithoutLineItemInput | FileAttachmentUpdateManyWithWhereWithoutLineItemInput[]
    deleteMany?: FileAttachmentScalarWhereInput | FileAttachmentScalarWhereInput[]
  }

  export type BatchUncheckedUpdateManyWithoutLineItemNestedInput = {
    create?: XOR<BatchCreateWithoutLineItemInput, BatchUncheckedCreateWithoutLineItemInput> | BatchCreateWithoutLineItemInput[] | BatchUncheckedCreateWithoutLineItemInput[]
    connectOrCreate?: BatchCreateOrConnectWithoutLineItemInput | BatchCreateOrConnectWithoutLineItemInput[]
    upsert?: BatchUpsertWithWhereUniqueWithoutLineItemInput | BatchUpsertWithWhereUniqueWithoutLineItemInput[]
    createMany?: BatchCreateManyLineItemInputEnvelope
    set?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    disconnect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    delete?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    connect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    update?: BatchUpdateWithWhereUniqueWithoutLineItemInput | BatchUpdateWithWhereUniqueWithoutLineItemInput[]
    updateMany?: BatchUpdateManyWithWhereWithoutLineItemInput | BatchUpdateManyWithWhereWithoutLineItemInput[]
    deleteMany?: BatchScalarWhereInput | BatchScalarWhereInput[]
  }

  export type OrderLineItemCreateNestedOneWithoutFileAttachmentsInput = {
    create?: XOR<OrderLineItemCreateWithoutFileAttachmentsInput, OrderLineItemUncheckedCreateWithoutFileAttachmentsInput>
    connectOrCreate?: OrderLineItemCreateOrConnectWithoutFileAttachmentsInput
    connect?: OrderLineItemWhereUniqueInput
  }

  export type OrderLineItemUpdateOneRequiredWithoutFileAttachmentsNestedInput = {
    create?: XOR<OrderLineItemCreateWithoutFileAttachmentsInput, OrderLineItemUncheckedCreateWithoutFileAttachmentsInput>
    connectOrCreate?: OrderLineItemCreateOrConnectWithoutFileAttachmentsInput
    upsert?: OrderLineItemUpsertWithoutFileAttachmentsInput
    connect?: OrderLineItemWhereUniqueInput
    update?: XOR<XOR<OrderLineItemUpdateToOneWithWhereWithoutFileAttachmentsInput, OrderLineItemUpdateWithoutFileAttachmentsInput>, OrderLineItemUncheckedUpdateWithoutFileAttachmentsInput>
  }

  export type OrderLineItemCreateNestedOneWithoutBatchesInput = {
    create?: XOR<OrderLineItemCreateWithoutBatchesInput, OrderLineItemUncheckedCreateWithoutBatchesInput>
    connectOrCreate?: OrderLineItemCreateOrConnectWithoutBatchesInput
    connect?: OrderLineItemWhereUniqueInput
  }

  export type RoutingStepCreateNestedManyWithoutBatchInput = {
    create?: XOR<RoutingStepCreateWithoutBatchInput, RoutingStepUncheckedCreateWithoutBatchInput> | RoutingStepCreateWithoutBatchInput[] | RoutingStepUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: RoutingStepCreateOrConnectWithoutBatchInput | RoutingStepCreateOrConnectWithoutBatchInput[]
    createMany?: RoutingStepCreateManyBatchInputEnvelope
    connect?: RoutingStepWhereUniqueInput | RoutingStepWhereUniqueInput[]
  }

  export type QCRecordCreateNestedManyWithoutBatchInput = {
    create?: XOR<QCRecordCreateWithoutBatchInput, QCRecordUncheckedCreateWithoutBatchInput> | QCRecordCreateWithoutBatchInput[] | QCRecordUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: QCRecordCreateOrConnectWithoutBatchInput | QCRecordCreateOrConnectWithoutBatchInput[]
    createMany?: QCRecordCreateManyBatchInputEnvelope
    connect?: QCRecordWhereUniqueInput | QCRecordWhereUniqueInput[]
  }

  export type RoutingStepUncheckedCreateNestedManyWithoutBatchInput = {
    create?: XOR<RoutingStepCreateWithoutBatchInput, RoutingStepUncheckedCreateWithoutBatchInput> | RoutingStepCreateWithoutBatchInput[] | RoutingStepUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: RoutingStepCreateOrConnectWithoutBatchInput | RoutingStepCreateOrConnectWithoutBatchInput[]
    createMany?: RoutingStepCreateManyBatchInputEnvelope
    connect?: RoutingStepWhereUniqueInput | RoutingStepWhereUniqueInput[]
  }

  export type QCRecordUncheckedCreateNestedManyWithoutBatchInput = {
    create?: XOR<QCRecordCreateWithoutBatchInput, QCRecordUncheckedCreateWithoutBatchInput> | QCRecordCreateWithoutBatchInput[] | QCRecordUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: QCRecordCreateOrConnectWithoutBatchInput | QCRecordCreateOrConnectWithoutBatchInput[]
    createMany?: QCRecordCreateManyBatchInputEnvelope
    connect?: QCRecordWhereUniqueInput | QCRecordWhereUniqueInput[]
  }

  export type EnumBatchPriorityFieldUpdateOperationsInput = {
    set?: $Enums.BatchPriority
  }

  export type EnumBatchStatusFieldUpdateOperationsInput = {
    set?: $Enums.BatchStatus
  }

  export type OrderLineItemUpdateOneRequiredWithoutBatchesNestedInput = {
    create?: XOR<OrderLineItemCreateWithoutBatchesInput, OrderLineItemUncheckedCreateWithoutBatchesInput>
    connectOrCreate?: OrderLineItemCreateOrConnectWithoutBatchesInput
    upsert?: OrderLineItemUpsertWithoutBatchesInput
    connect?: OrderLineItemWhereUniqueInput
    update?: XOR<XOR<OrderLineItemUpdateToOneWithWhereWithoutBatchesInput, OrderLineItemUpdateWithoutBatchesInput>, OrderLineItemUncheckedUpdateWithoutBatchesInput>
  }

  export type RoutingStepUpdateManyWithoutBatchNestedInput = {
    create?: XOR<RoutingStepCreateWithoutBatchInput, RoutingStepUncheckedCreateWithoutBatchInput> | RoutingStepCreateWithoutBatchInput[] | RoutingStepUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: RoutingStepCreateOrConnectWithoutBatchInput | RoutingStepCreateOrConnectWithoutBatchInput[]
    upsert?: RoutingStepUpsertWithWhereUniqueWithoutBatchInput | RoutingStepUpsertWithWhereUniqueWithoutBatchInput[]
    createMany?: RoutingStepCreateManyBatchInputEnvelope
    set?: RoutingStepWhereUniqueInput | RoutingStepWhereUniqueInput[]
    disconnect?: RoutingStepWhereUniqueInput | RoutingStepWhereUniqueInput[]
    delete?: RoutingStepWhereUniqueInput | RoutingStepWhereUniqueInput[]
    connect?: RoutingStepWhereUniqueInput | RoutingStepWhereUniqueInput[]
    update?: RoutingStepUpdateWithWhereUniqueWithoutBatchInput | RoutingStepUpdateWithWhereUniqueWithoutBatchInput[]
    updateMany?: RoutingStepUpdateManyWithWhereWithoutBatchInput | RoutingStepUpdateManyWithWhereWithoutBatchInput[]
    deleteMany?: RoutingStepScalarWhereInput | RoutingStepScalarWhereInput[]
  }

  export type QCRecordUpdateManyWithoutBatchNestedInput = {
    create?: XOR<QCRecordCreateWithoutBatchInput, QCRecordUncheckedCreateWithoutBatchInput> | QCRecordCreateWithoutBatchInput[] | QCRecordUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: QCRecordCreateOrConnectWithoutBatchInput | QCRecordCreateOrConnectWithoutBatchInput[]
    upsert?: QCRecordUpsertWithWhereUniqueWithoutBatchInput | QCRecordUpsertWithWhereUniqueWithoutBatchInput[]
    createMany?: QCRecordCreateManyBatchInputEnvelope
    set?: QCRecordWhereUniqueInput | QCRecordWhereUniqueInput[]
    disconnect?: QCRecordWhereUniqueInput | QCRecordWhereUniqueInput[]
    delete?: QCRecordWhereUniqueInput | QCRecordWhereUniqueInput[]
    connect?: QCRecordWhereUniqueInput | QCRecordWhereUniqueInput[]
    update?: QCRecordUpdateWithWhereUniqueWithoutBatchInput | QCRecordUpdateWithWhereUniqueWithoutBatchInput[]
    updateMany?: QCRecordUpdateManyWithWhereWithoutBatchInput | QCRecordUpdateManyWithWhereWithoutBatchInput[]
    deleteMany?: QCRecordScalarWhereInput | QCRecordScalarWhereInput[]
  }

  export type RoutingStepUncheckedUpdateManyWithoutBatchNestedInput = {
    create?: XOR<RoutingStepCreateWithoutBatchInput, RoutingStepUncheckedCreateWithoutBatchInput> | RoutingStepCreateWithoutBatchInput[] | RoutingStepUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: RoutingStepCreateOrConnectWithoutBatchInput | RoutingStepCreateOrConnectWithoutBatchInput[]
    upsert?: RoutingStepUpsertWithWhereUniqueWithoutBatchInput | RoutingStepUpsertWithWhereUniqueWithoutBatchInput[]
    createMany?: RoutingStepCreateManyBatchInputEnvelope
    set?: RoutingStepWhereUniqueInput | RoutingStepWhereUniqueInput[]
    disconnect?: RoutingStepWhereUniqueInput | RoutingStepWhereUniqueInput[]
    delete?: RoutingStepWhereUniqueInput | RoutingStepWhereUniqueInput[]
    connect?: RoutingStepWhereUniqueInput | RoutingStepWhereUniqueInput[]
    update?: RoutingStepUpdateWithWhereUniqueWithoutBatchInput | RoutingStepUpdateWithWhereUniqueWithoutBatchInput[]
    updateMany?: RoutingStepUpdateManyWithWhereWithoutBatchInput | RoutingStepUpdateManyWithWhereWithoutBatchInput[]
    deleteMany?: RoutingStepScalarWhereInput | RoutingStepScalarWhereInput[]
  }

  export type QCRecordUncheckedUpdateManyWithoutBatchNestedInput = {
    create?: XOR<QCRecordCreateWithoutBatchInput, QCRecordUncheckedCreateWithoutBatchInput> | QCRecordCreateWithoutBatchInput[] | QCRecordUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: QCRecordCreateOrConnectWithoutBatchInput | QCRecordCreateOrConnectWithoutBatchInput[]
    upsert?: QCRecordUpsertWithWhereUniqueWithoutBatchInput | QCRecordUpsertWithWhereUniqueWithoutBatchInput[]
    createMany?: QCRecordCreateManyBatchInputEnvelope
    set?: QCRecordWhereUniqueInput | QCRecordWhereUniqueInput[]
    disconnect?: QCRecordWhereUniqueInput | QCRecordWhereUniqueInput[]
    delete?: QCRecordWhereUniqueInput | QCRecordWhereUniqueInput[]
    connect?: QCRecordWhereUniqueInput | QCRecordWhereUniqueInput[]
    update?: QCRecordUpdateWithWhereUniqueWithoutBatchInput | QCRecordUpdateWithWhereUniqueWithoutBatchInput[]
    updateMany?: QCRecordUpdateManyWithWhereWithoutBatchInput | QCRecordUpdateManyWithWhereWithoutBatchInput[]
    deleteMany?: QCRecordScalarWhereInput | QCRecordScalarWhereInput[]
  }

  export type BatchCreateNestedOneWithoutRoutingStepsInput = {
    create?: XOR<BatchCreateWithoutRoutingStepsInput, BatchUncheckedCreateWithoutRoutingStepsInput>
    connectOrCreate?: BatchCreateOrConnectWithoutRoutingStepsInput
    connect?: BatchWhereUniqueInput
  }

  export type WorkstationCreateNestedOneWithoutRoutingStepsInput = {
    create?: XOR<WorkstationCreateWithoutRoutingStepsInput, WorkstationUncheckedCreateWithoutRoutingStepsInput>
    connectOrCreate?: WorkstationCreateOrConnectWithoutRoutingStepsInput
    connect?: WorkstationWhereUniqueInput
  }

  export type StepConfirmationCreateNestedManyWithoutRoutingStepInput = {
    create?: XOR<StepConfirmationCreateWithoutRoutingStepInput, StepConfirmationUncheckedCreateWithoutRoutingStepInput> | StepConfirmationCreateWithoutRoutingStepInput[] | StepConfirmationUncheckedCreateWithoutRoutingStepInput[]
    connectOrCreate?: StepConfirmationCreateOrConnectWithoutRoutingStepInput | StepConfirmationCreateOrConnectWithoutRoutingStepInput[]
    createMany?: StepConfirmationCreateManyRoutingStepInputEnvelope
    connect?: StepConfirmationWhereUniqueInput | StepConfirmationWhereUniqueInput[]
  }

  export type StepConfirmationUncheckedCreateNestedManyWithoutRoutingStepInput = {
    create?: XOR<StepConfirmationCreateWithoutRoutingStepInput, StepConfirmationUncheckedCreateWithoutRoutingStepInput> | StepConfirmationCreateWithoutRoutingStepInput[] | StepConfirmationUncheckedCreateWithoutRoutingStepInput[]
    connectOrCreate?: StepConfirmationCreateOrConnectWithoutRoutingStepInput | StepConfirmationCreateOrConnectWithoutRoutingStepInput[]
    createMany?: StepConfirmationCreateManyRoutingStepInputEnvelope
    connect?: StepConfirmationWhereUniqueInput | StepConfirmationWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumStepStatusFieldUpdateOperationsInput = {
    set?: $Enums.StepStatus
  }

  export type BatchUpdateOneRequiredWithoutRoutingStepsNestedInput = {
    create?: XOR<BatchCreateWithoutRoutingStepsInput, BatchUncheckedCreateWithoutRoutingStepsInput>
    connectOrCreate?: BatchCreateOrConnectWithoutRoutingStepsInput
    upsert?: BatchUpsertWithoutRoutingStepsInput
    connect?: BatchWhereUniqueInput
    update?: XOR<XOR<BatchUpdateToOneWithWhereWithoutRoutingStepsInput, BatchUpdateWithoutRoutingStepsInput>, BatchUncheckedUpdateWithoutRoutingStepsInput>
  }

  export type WorkstationUpdateOneRequiredWithoutRoutingStepsNestedInput = {
    create?: XOR<WorkstationCreateWithoutRoutingStepsInput, WorkstationUncheckedCreateWithoutRoutingStepsInput>
    connectOrCreate?: WorkstationCreateOrConnectWithoutRoutingStepsInput
    upsert?: WorkstationUpsertWithoutRoutingStepsInput
    connect?: WorkstationWhereUniqueInput
    update?: XOR<XOR<WorkstationUpdateToOneWithWhereWithoutRoutingStepsInput, WorkstationUpdateWithoutRoutingStepsInput>, WorkstationUncheckedUpdateWithoutRoutingStepsInput>
  }

  export type StepConfirmationUpdateManyWithoutRoutingStepNestedInput = {
    create?: XOR<StepConfirmationCreateWithoutRoutingStepInput, StepConfirmationUncheckedCreateWithoutRoutingStepInput> | StepConfirmationCreateWithoutRoutingStepInput[] | StepConfirmationUncheckedCreateWithoutRoutingStepInput[]
    connectOrCreate?: StepConfirmationCreateOrConnectWithoutRoutingStepInput | StepConfirmationCreateOrConnectWithoutRoutingStepInput[]
    upsert?: StepConfirmationUpsertWithWhereUniqueWithoutRoutingStepInput | StepConfirmationUpsertWithWhereUniqueWithoutRoutingStepInput[]
    createMany?: StepConfirmationCreateManyRoutingStepInputEnvelope
    set?: StepConfirmationWhereUniqueInput | StepConfirmationWhereUniqueInput[]
    disconnect?: StepConfirmationWhereUniqueInput | StepConfirmationWhereUniqueInput[]
    delete?: StepConfirmationWhereUniqueInput | StepConfirmationWhereUniqueInput[]
    connect?: StepConfirmationWhereUniqueInput | StepConfirmationWhereUniqueInput[]
    update?: StepConfirmationUpdateWithWhereUniqueWithoutRoutingStepInput | StepConfirmationUpdateWithWhereUniqueWithoutRoutingStepInput[]
    updateMany?: StepConfirmationUpdateManyWithWhereWithoutRoutingStepInput | StepConfirmationUpdateManyWithWhereWithoutRoutingStepInput[]
    deleteMany?: StepConfirmationScalarWhereInput | StepConfirmationScalarWhereInput[]
  }

  export type StepConfirmationUncheckedUpdateManyWithoutRoutingStepNestedInput = {
    create?: XOR<StepConfirmationCreateWithoutRoutingStepInput, StepConfirmationUncheckedCreateWithoutRoutingStepInput> | StepConfirmationCreateWithoutRoutingStepInput[] | StepConfirmationUncheckedCreateWithoutRoutingStepInput[]
    connectOrCreate?: StepConfirmationCreateOrConnectWithoutRoutingStepInput | StepConfirmationCreateOrConnectWithoutRoutingStepInput[]
    upsert?: StepConfirmationUpsertWithWhereUniqueWithoutRoutingStepInput | StepConfirmationUpsertWithWhereUniqueWithoutRoutingStepInput[]
    createMany?: StepConfirmationCreateManyRoutingStepInputEnvelope
    set?: StepConfirmationWhereUniqueInput | StepConfirmationWhereUniqueInput[]
    disconnect?: StepConfirmationWhereUniqueInput | StepConfirmationWhereUniqueInput[]
    delete?: StepConfirmationWhereUniqueInput | StepConfirmationWhereUniqueInput[]
    connect?: StepConfirmationWhereUniqueInput | StepConfirmationWhereUniqueInput[]
    update?: StepConfirmationUpdateWithWhereUniqueWithoutRoutingStepInput | StepConfirmationUpdateWithWhereUniqueWithoutRoutingStepInput[]
    updateMany?: StepConfirmationUpdateManyWithWhereWithoutRoutingStepInput | StepConfirmationUpdateManyWithWhereWithoutRoutingStepInput[]
    deleteMany?: StepConfirmationScalarWhereInput | StepConfirmationScalarWhereInput[]
  }

  export type RoutingStepCreateNestedManyWithoutWorkstationInput = {
    create?: XOR<RoutingStepCreateWithoutWorkstationInput, RoutingStepUncheckedCreateWithoutWorkstationInput> | RoutingStepCreateWithoutWorkstationInput[] | RoutingStepUncheckedCreateWithoutWorkstationInput[]
    connectOrCreate?: RoutingStepCreateOrConnectWithoutWorkstationInput | RoutingStepCreateOrConnectWithoutWorkstationInput[]
    createMany?: RoutingStepCreateManyWorkstationInputEnvelope
    connect?: RoutingStepWhereUniqueInput | RoutingStepWhereUniqueInput[]
  }

  export type StepConfirmationCreateNestedManyWithoutWorkstationInput = {
    create?: XOR<StepConfirmationCreateWithoutWorkstationInput, StepConfirmationUncheckedCreateWithoutWorkstationInput> | StepConfirmationCreateWithoutWorkstationInput[] | StepConfirmationUncheckedCreateWithoutWorkstationInput[]
    connectOrCreate?: StepConfirmationCreateOrConnectWithoutWorkstationInput | StepConfirmationCreateOrConnectWithoutWorkstationInput[]
    createMany?: StepConfirmationCreateManyWorkstationInputEnvelope
    connect?: StepConfirmationWhereUniqueInput | StepConfirmationWhereUniqueInput[]
  }

  export type RoutingStepUncheckedCreateNestedManyWithoutWorkstationInput = {
    create?: XOR<RoutingStepCreateWithoutWorkstationInput, RoutingStepUncheckedCreateWithoutWorkstationInput> | RoutingStepCreateWithoutWorkstationInput[] | RoutingStepUncheckedCreateWithoutWorkstationInput[]
    connectOrCreate?: RoutingStepCreateOrConnectWithoutWorkstationInput | RoutingStepCreateOrConnectWithoutWorkstationInput[]
    createMany?: RoutingStepCreateManyWorkstationInputEnvelope
    connect?: RoutingStepWhereUniqueInput | RoutingStepWhereUniqueInput[]
  }

  export type StepConfirmationUncheckedCreateNestedManyWithoutWorkstationInput = {
    create?: XOR<StepConfirmationCreateWithoutWorkstationInput, StepConfirmationUncheckedCreateWithoutWorkstationInput> | StepConfirmationCreateWithoutWorkstationInput[] | StepConfirmationUncheckedCreateWithoutWorkstationInput[]
    connectOrCreate?: StepConfirmationCreateOrConnectWithoutWorkstationInput | StepConfirmationCreateOrConnectWithoutWorkstationInput[]
    createMany?: StepConfirmationCreateManyWorkstationInputEnvelope
    connect?: StepConfirmationWhereUniqueInput | StepConfirmationWhereUniqueInput[]
  }

  export type RoutingStepUpdateManyWithoutWorkstationNestedInput = {
    create?: XOR<RoutingStepCreateWithoutWorkstationInput, RoutingStepUncheckedCreateWithoutWorkstationInput> | RoutingStepCreateWithoutWorkstationInput[] | RoutingStepUncheckedCreateWithoutWorkstationInput[]
    connectOrCreate?: RoutingStepCreateOrConnectWithoutWorkstationInput | RoutingStepCreateOrConnectWithoutWorkstationInput[]
    upsert?: RoutingStepUpsertWithWhereUniqueWithoutWorkstationInput | RoutingStepUpsertWithWhereUniqueWithoutWorkstationInput[]
    createMany?: RoutingStepCreateManyWorkstationInputEnvelope
    set?: RoutingStepWhereUniqueInput | RoutingStepWhereUniqueInput[]
    disconnect?: RoutingStepWhereUniqueInput | RoutingStepWhereUniqueInput[]
    delete?: RoutingStepWhereUniqueInput | RoutingStepWhereUniqueInput[]
    connect?: RoutingStepWhereUniqueInput | RoutingStepWhereUniqueInput[]
    update?: RoutingStepUpdateWithWhereUniqueWithoutWorkstationInput | RoutingStepUpdateWithWhereUniqueWithoutWorkstationInput[]
    updateMany?: RoutingStepUpdateManyWithWhereWithoutWorkstationInput | RoutingStepUpdateManyWithWhereWithoutWorkstationInput[]
    deleteMany?: RoutingStepScalarWhereInput | RoutingStepScalarWhereInput[]
  }

  export type StepConfirmationUpdateManyWithoutWorkstationNestedInput = {
    create?: XOR<StepConfirmationCreateWithoutWorkstationInput, StepConfirmationUncheckedCreateWithoutWorkstationInput> | StepConfirmationCreateWithoutWorkstationInput[] | StepConfirmationUncheckedCreateWithoutWorkstationInput[]
    connectOrCreate?: StepConfirmationCreateOrConnectWithoutWorkstationInput | StepConfirmationCreateOrConnectWithoutWorkstationInput[]
    upsert?: StepConfirmationUpsertWithWhereUniqueWithoutWorkstationInput | StepConfirmationUpsertWithWhereUniqueWithoutWorkstationInput[]
    createMany?: StepConfirmationCreateManyWorkstationInputEnvelope
    set?: StepConfirmationWhereUniqueInput | StepConfirmationWhereUniqueInput[]
    disconnect?: StepConfirmationWhereUniqueInput | StepConfirmationWhereUniqueInput[]
    delete?: StepConfirmationWhereUniqueInput | StepConfirmationWhereUniqueInput[]
    connect?: StepConfirmationWhereUniqueInput | StepConfirmationWhereUniqueInput[]
    update?: StepConfirmationUpdateWithWhereUniqueWithoutWorkstationInput | StepConfirmationUpdateWithWhereUniqueWithoutWorkstationInput[]
    updateMany?: StepConfirmationUpdateManyWithWhereWithoutWorkstationInput | StepConfirmationUpdateManyWithWhereWithoutWorkstationInput[]
    deleteMany?: StepConfirmationScalarWhereInput | StepConfirmationScalarWhereInput[]
  }

  export type RoutingStepUncheckedUpdateManyWithoutWorkstationNestedInput = {
    create?: XOR<RoutingStepCreateWithoutWorkstationInput, RoutingStepUncheckedCreateWithoutWorkstationInput> | RoutingStepCreateWithoutWorkstationInput[] | RoutingStepUncheckedCreateWithoutWorkstationInput[]
    connectOrCreate?: RoutingStepCreateOrConnectWithoutWorkstationInput | RoutingStepCreateOrConnectWithoutWorkstationInput[]
    upsert?: RoutingStepUpsertWithWhereUniqueWithoutWorkstationInput | RoutingStepUpsertWithWhereUniqueWithoutWorkstationInput[]
    createMany?: RoutingStepCreateManyWorkstationInputEnvelope
    set?: RoutingStepWhereUniqueInput | RoutingStepWhereUniqueInput[]
    disconnect?: RoutingStepWhereUniqueInput | RoutingStepWhereUniqueInput[]
    delete?: RoutingStepWhereUniqueInput | RoutingStepWhereUniqueInput[]
    connect?: RoutingStepWhereUniqueInput | RoutingStepWhereUniqueInput[]
    update?: RoutingStepUpdateWithWhereUniqueWithoutWorkstationInput | RoutingStepUpdateWithWhereUniqueWithoutWorkstationInput[]
    updateMany?: RoutingStepUpdateManyWithWhereWithoutWorkstationInput | RoutingStepUpdateManyWithWhereWithoutWorkstationInput[]
    deleteMany?: RoutingStepScalarWhereInput | RoutingStepScalarWhereInput[]
  }

  export type StepConfirmationUncheckedUpdateManyWithoutWorkstationNestedInput = {
    create?: XOR<StepConfirmationCreateWithoutWorkstationInput, StepConfirmationUncheckedCreateWithoutWorkstationInput> | StepConfirmationCreateWithoutWorkstationInput[] | StepConfirmationUncheckedCreateWithoutWorkstationInput[]
    connectOrCreate?: StepConfirmationCreateOrConnectWithoutWorkstationInput | StepConfirmationCreateOrConnectWithoutWorkstationInput[]
    upsert?: StepConfirmationUpsertWithWhereUniqueWithoutWorkstationInput | StepConfirmationUpsertWithWhereUniqueWithoutWorkstationInput[]
    createMany?: StepConfirmationCreateManyWorkstationInputEnvelope
    set?: StepConfirmationWhereUniqueInput | StepConfirmationWhereUniqueInput[]
    disconnect?: StepConfirmationWhereUniqueInput | StepConfirmationWhereUniqueInput[]
    delete?: StepConfirmationWhereUniqueInput | StepConfirmationWhereUniqueInput[]
    connect?: StepConfirmationWhereUniqueInput | StepConfirmationWhereUniqueInput[]
    update?: StepConfirmationUpdateWithWhereUniqueWithoutWorkstationInput | StepConfirmationUpdateWithWhereUniqueWithoutWorkstationInput[]
    updateMany?: StepConfirmationUpdateManyWithWhereWithoutWorkstationInput | StepConfirmationUpdateManyWithWhereWithoutWorkstationInput[]
    deleteMany?: StepConfirmationScalarWhereInput | StepConfirmationScalarWhereInput[]
  }

  export type RoutingStepCreateNestedOneWithoutConfirmationsInput = {
    create?: XOR<RoutingStepCreateWithoutConfirmationsInput, RoutingStepUncheckedCreateWithoutConfirmationsInput>
    connectOrCreate?: RoutingStepCreateOrConnectWithoutConfirmationsInput
    connect?: RoutingStepWhereUniqueInput
  }

  export type WorkstationCreateNestedOneWithoutConfirmationsInput = {
    create?: XOR<WorkstationCreateWithoutConfirmationsInput, WorkstationUncheckedCreateWithoutConfirmationsInput>
    connectOrCreate?: WorkstationCreateOrConnectWithoutConfirmationsInput
    connect?: WorkstationWhereUniqueInput
  }

  export type EnumConfirmationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ConfirmationStatus
  }

  export type RoutingStepUpdateOneRequiredWithoutConfirmationsNestedInput = {
    create?: XOR<RoutingStepCreateWithoutConfirmationsInput, RoutingStepUncheckedCreateWithoutConfirmationsInput>
    connectOrCreate?: RoutingStepCreateOrConnectWithoutConfirmationsInput
    upsert?: RoutingStepUpsertWithoutConfirmationsInput
    connect?: RoutingStepWhereUniqueInput
    update?: XOR<XOR<RoutingStepUpdateToOneWithWhereWithoutConfirmationsInput, RoutingStepUpdateWithoutConfirmationsInput>, RoutingStepUncheckedUpdateWithoutConfirmationsInput>
  }

  export type WorkstationUpdateOneRequiredWithoutConfirmationsNestedInput = {
    create?: XOR<WorkstationCreateWithoutConfirmationsInput, WorkstationUncheckedCreateWithoutConfirmationsInput>
    connectOrCreate?: WorkstationCreateOrConnectWithoutConfirmationsInput
    upsert?: WorkstationUpsertWithoutConfirmationsInput
    connect?: WorkstationWhereUniqueInput
    update?: XOR<XOR<WorkstationUpdateToOneWithWhereWithoutConfirmationsInput, WorkstationUpdateWithoutConfirmationsInput>, WorkstationUncheckedUpdateWithoutConfirmationsInput>
  }

  export type BatchCreateNestedOneWithoutQcRecordsInput = {
    create?: XOR<BatchCreateWithoutQcRecordsInput, BatchUncheckedCreateWithoutQcRecordsInput>
    connectOrCreate?: BatchCreateOrConnectWithoutQcRecordsInput
    connect?: BatchWhereUniqueInput
  }

  export type EnumQCResultFieldUpdateOperationsInput = {
    set?: $Enums.QCResult
  }

  export type BatchUpdateOneRequiredWithoutQcRecordsNestedInput = {
    create?: XOR<BatchCreateWithoutQcRecordsInput, BatchUncheckedCreateWithoutQcRecordsInput>
    connectOrCreate?: BatchCreateOrConnectWithoutQcRecordsInput
    upsert?: BatchUpsertWithoutQcRecordsInput
    connect?: BatchWhereUniqueInput
    update?: XOR<XOR<BatchUpdateToOneWithWhereWithoutQcRecordsInput, BatchUpdateWithoutQcRecordsInput>, BatchUncheckedUpdateWithoutQcRecordsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumSyncStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SyncStatus | EnumSyncStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SyncStatus[] | ListEnumSyncStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SyncStatus[] | ListEnumSyncStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSyncStatusFilter<$PrismaModel> | $Enums.SyncStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumSyncStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SyncStatus | EnumSyncStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SyncStatus[] | ListEnumSyncStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SyncStatus[] | ListEnumSyncStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSyncStatusWithAggregatesFilter<$PrismaModel> | $Enums.SyncStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSyncStatusFilter<$PrismaModel>
    _max?: NestedEnumSyncStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumOrderPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderPriority | EnumOrderPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.OrderPriority[] | ListEnumOrderPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderPriority[] | ListEnumOrderPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderPriorityFilter<$PrismaModel> | $Enums.OrderPriority
  }

  export type NestedEnumOrderPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderPriority | EnumOrderPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.OrderPriority[] | ListEnumOrderPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderPriority[] | ListEnumOrderPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderPriorityWithAggregatesFilter<$PrismaModel> | $Enums.OrderPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderPriorityFilter<$PrismaModel>
    _max?: NestedEnumOrderPriorityFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumBatchPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.BatchPriority | EnumBatchPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.BatchPriority[] | ListEnumBatchPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.BatchPriority[] | ListEnumBatchPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumBatchPriorityFilter<$PrismaModel> | $Enums.BatchPriority
  }

  export type NestedEnumBatchStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BatchStatus | EnumBatchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BatchStatus[] | ListEnumBatchStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BatchStatus[] | ListEnumBatchStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBatchStatusFilter<$PrismaModel> | $Enums.BatchStatus
  }

  export type NestedEnumBatchPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BatchPriority | EnumBatchPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.BatchPriority[] | ListEnumBatchPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.BatchPriority[] | ListEnumBatchPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumBatchPriorityWithAggregatesFilter<$PrismaModel> | $Enums.BatchPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBatchPriorityFilter<$PrismaModel>
    _max?: NestedEnumBatchPriorityFilter<$PrismaModel>
  }

  export type NestedEnumBatchStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BatchStatus | EnumBatchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BatchStatus[] | ListEnumBatchStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BatchStatus[] | ListEnumBatchStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBatchStatusWithAggregatesFilter<$PrismaModel> | $Enums.BatchStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBatchStatusFilter<$PrismaModel>
    _max?: NestedEnumBatchStatusFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumStepStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StepStatus | EnumStepStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StepStatus[] | ListEnumStepStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StepStatus[] | ListEnumStepStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStepStatusFilter<$PrismaModel> | $Enums.StepStatus
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumStepStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StepStatus | EnumStepStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StepStatus[] | ListEnumStepStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StepStatus[] | ListEnumStepStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStepStatusWithAggregatesFilter<$PrismaModel> | $Enums.StepStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStepStatusFilter<$PrismaModel>
    _max?: NestedEnumStepStatusFilter<$PrismaModel>
  }

  export type NestedEnumConfirmationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ConfirmationStatus | EnumConfirmationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConfirmationStatus[] | ListEnumConfirmationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConfirmationStatus[] | ListEnumConfirmationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConfirmationStatusFilter<$PrismaModel> | $Enums.ConfirmationStatus
  }

  export type NestedEnumConfirmationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConfirmationStatus | EnumConfirmationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConfirmationStatus[] | ListEnumConfirmationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConfirmationStatus[] | ListEnumConfirmationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConfirmationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ConfirmationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConfirmationStatusFilter<$PrismaModel>
    _max?: NestedEnumConfirmationStatusFilter<$PrismaModel>
  }

  export type NestedEnumQCResultFilter<$PrismaModel = never> = {
    equals?: $Enums.QCResult | EnumQCResultFieldRefInput<$PrismaModel>
    in?: $Enums.QCResult[] | ListEnumQCResultFieldRefInput<$PrismaModel>
    notIn?: $Enums.QCResult[] | ListEnumQCResultFieldRefInput<$PrismaModel>
    not?: NestedEnumQCResultFilter<$PrismaModel> | $Enums.QCResult
  }

  export type NestedEnumQCResultWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QCResult | EnumQCResultFieldRefInput<$PrismaModel>
    in?: $Enums.QCResult[] | ListEnumQCResultFieldRefInput<$PrismaModel>
    notIn?: $Enums.QCResult[] | ListEnumQCResultFieldRefInput<$PrismaModel>
    not?: NestedEnumQCResultWithAggregatesFilter<$PrismaModel> | $Enums.QCResult
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQCResultFilter<$PrismaModel>
    _max?: NestedEnumQCResultFilter<$PrismaModel>
  }

  export type PurchaseOrderCreateWithoutCustomerInput = {
    id?: string
    systemOrderId?: string
    poNumber: string
    dueDate: Date | string
    priority?: $Enums.OrderPriority
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lineItems?: OrderLineItemCreateNestedManyWithoutPurchaseOrderInput
  }

  export type PurchaseOrderUncheckedCreateWithoutCustomerInput = {
    id?: string
    systemOrderId?: string
    poNumber: string
    dueDate: Date | string
    priority?: $Enums.OrderPriority
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lineItems?: OrderLineItemUncheckedCreateNestedManyWithoutPurchaseOrderInput
  }

  export type PurchaseOrderCreateOrConnectWithoutCustomerInput = {
    where: PurchaseOrderWhereUniqueInput
    create: XOR<PurchaseOrderCreateWithoutCustomerInput, PurchaseOrderUncheckedCreateWithoutCustomerInput>
  }

  export type PurchaseOrderCreateManyCustomerInputEnvelope = {
    data: PurchaseOrderCreateManyCustomerInput | PurchaseOrderCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type PurchaseOrderUpsertWithWhereUniqueWithoutCustomerInput = {
    where: PurchaseOrderWhereUniqueInput
    update: XOR<PurchaseOrderUpdateWithoutCustomerInput, PurchaseOrderUncheckedUpdateWithoutCustomerInput>
    create: XOR<PurchaseOrderCreateWithoutCustomerInput, PurchaseOrderUncheckedCreateWithoutCustomerInput>
  }

  export type PurchaseOrderUpdateWithWhereUniqueWithoutCustomerInput = {
    where: PurchaseOrderWhereUniqueInput
    data: XOR<PurchaseOrderUpdateWithoutCustomerInput, PurchaseOrderUncheckedUpdateWithoutCustomerInput>
  }

  export type PurchaseOrderUpdateManyWithWhereWithoutCustomerInput = {
    where: PurchaseOrderScalarWhereInput
    data: XOR<PurchaseOrderUpdateManyMutationInput, PurchaseOrderUncheckedUpdateManyWithoutCustomerInput>
  }

  export type PurchaseOrderScalarWhereInput = {
    AND?: PurchaseOrderScalarWhereInput | PurchaseOrderScalarWhereInput[]
    OR?: PurchaseOrderScalarWhereInput[]
    NOT?: PurchaseOrderScalarWhereInput | PurchaseOrderScalarWhereInput[]
    id?: StringFilter<"PurchaseOrder"> | string
    systemOrderId?: StringFilter<"PurchaseOrder"> | string
    customerId?: StringFilter<"PurchaseOrder"> | string
    poNumber?: StringFilter<"PurchaseOrder"> | string
    dueDate?: DateTimeFilter<"PurchaseOrder"> | Date | string
    priority?: EnumOrderPriorityFilter<"PurchaseOrder"> | $Enums.OrderPriority
    notes?: StringNullableFilter<"PurchaseOrder"> | string | null
    createdAt?: DateTimeFilter<"PurchaseOrder"> | Date | string
    updatedAt?: DateTimeFilter<"PurchaseOrder"> | Date | string
  }

  export type CustomerCreateWithoutPurchaseOrdersInput = {
    id?: string
    name: string
    contactName?: string | null
    email?: string | null
    phone?: string | null
    billingAddress?: string | null
    shippingAddress?: string | null
    notes?: string | null
    quickbooksId?: string | null
    syncStatus?: $Enums.SyncStatus
    lastSyncedAt?: Date | string | null
    syncError?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUncheckedCreateWithoutPurchaseOrdersInput = {
    id?: string
    name: string
    contactName?: string | null
    email?: string | null
    phone?: string | null
    billingAddress?: string | null
    shippingAddress?: string | null
    notes?: string | null
    quickbooksId?: string | null
    syncStatus?: $Enums.SyncStatus
    lastSyncedAt?: Date | string | null
    syncError?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerCreateOrConnectWithoutPurchaseOrdersInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutPurchaseOrdersInput, CustomerUncheckedCreateWithoutPurchaseOrdersInput>
  }

  export type OrderLineItemCreateWithoutPurchaseOrderInput = {
    id?: string
    partNumber: string
    partName: string
    drawingNumber?: string | null
    revisionLevel?: string | null
    quantity: number
    dueDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fileAttachments?: FileAttachmentCreateNestedManyWithoutLineItemInput
    batches?: BatchCreateNestedManyWithoutLineItemInput
  }

  export type OrderLineItemUncheckedCreateWithoutPurchaseOrderInput = {
    id?: string
    partNumber: string
    partName: string
    drawingNumber?: string | null
    revisionLevel?: string | null
    quantity: number
    dueDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fileAttachments?: FileAttachmentUncheckedCreateNestedManyWithoutLineItemInput
    batches?: BatchUncheckedCreateNestedManyWithoutLineItemInput
  }

  export type OrderLineItemCreateOrConnectWithoutPurchaseOrderInput = {
    where: OrderLineItemWhereUniqueInput
    create: XOR<OrderLineItemCreateWithoutPurchaseOrderInput, OrderLineItemUncheckedCreateWithoutPurchaseOrderInput>
  }

  export type OrderLineItemCreateManyPurchaseOrderInputEnvelope = {
    data: OrderLineItemCreateManyPurchaseOrderInput | OrderLineItemCreateManyPurchaseOrderInput[]
    skipDuplicates?: boolean
  }

  export type CustomerUpsertWithoutPurchaseOrdersInput = {
    update: XOR<CustomerUpdateWithoutPurchaseOrdersInput, CustomerUncheckedUpdateWithoutPurchaseOrdersInput>
    create: XOR<CustomerCreateWithoutPurchaseOrdersInput, CustomerUncheckedCreateWithoutPurchaseOrdersInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutPurchaseOrdersInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutPurchaseOrdersInput, CustomerUncheckedUpdateWithoutPurchaseOrdersInput>
  }

  export type CustomerUpdateWithoutPurchaseOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    quickbooksId?: NullableStringFieldUpdateOperationsInput | string | null
    syncStatus?: EnumSyncStatusFieldUpdateOperationsInput | $Enums.SyncStatus
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateWithoutPurchaseOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    quickbooksId?: NullableStringFieldUpdateOperationsInput | string | null
    syncStatus?: EnumSyncStatusFieldUpdateOperationsInput | $Enums.SyncStatus
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderLineItemUpsertWithWhereUniqueWithoutPurchaseOrderInput = {
    where: OrderLineItemWhereUniqueInput
    update: XOR<OrderLineItemUpdateWithoutPurchaseOrderInput, OrderLineItemUncheckedUpdateWithoutPurchaseOrderInput>
    create: XOR<OrderLineItemCreateWithoutPurchaseOrderInput, OrderLineItemUncheckedCreateWithoutPurchaseOrderInput>
  }

  export type OrderLineItemUpdateWithWhereUniqueWithoutPurchaseOrderInput = {
    where: OrderLineItemWhereUniqueInput
    data: XOR<OrderLineItemUpdateWithoutPurchaseOrderInput, OrderLineItemUncheckedUpdateWithoutPurchaseOrderInput>
  }

  export type OrderLineItemUpdateManyWithWhereWithoutPurchaseOrderInput = {
    where: OrderLineItemScalarWhereInput
    data: XOR<OrderLineItemUpdateManyMutationInput, OrderLineItemUncheckedUpdateManyWithoutPurchaseOrderInput>
  }

  export type OrderLineItemScalarWhereInput = {
    AND?: OrderLineItemScalarWhereInput | OrderLineItemScalarWhereInput[]
    OR?: OrderLineItemScalarWhereInput[]
    NOT?: OrderLineItemScalarWhereInput | OrderLineItemScalarWhereInput[]
    id?: StringFilter<"OrderLineItem"> | string
    orderId?: StringFilter<"OrderLineItem"> | string
    partNumber?: StringFilter<"OrderLineItem"> | string
    partName?: StringFilter<"OrderLineItem"> | string
    drawingNumber?: StringNullableFilter<"OrderLineItem"> | string | null
    revisionLevel?: StringNullableFilter<"OrderLineItem"> | string | null
    quantity?: IntFilter<"OrderLineItem"> | number
    dueDate?: DateTimeNullableFilter<"OrderLineItem"> | Date | string | null
    notes?: StringNullableFilter<"OrderLineItem"> | string | null
    createdAt?: DateTimeFilter<"OrderLineItem"> | Date | string
    updatedAt?: DateTimeFilter<"OrderLineItem"> | Date | string
  }

  export type PurchaseOrderCreateWithoutLineItemsInput = {
    id?: string
    systemOrderId?: string
    poNumber: string
    dueDate: Date | string
    priority?: $Enums.OrderPriority
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutPurchaseOrdersInput
  }

  export type PurchaseOrderUncheckedCreateWithoutLineItemsInput = {
    id?: string
    systemOrderId?: string
    customerId: string
    poNumber: string
    dueDate: Date | string
    priority?: $Enums.OrderPriority
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PurchaseOrderCreateOrConnectWithoutLineItemsInput = {
    where: PurchaseOrderWhereUniqueInput
    create: XOR<PurchaseOrderCreateWithoutLineItemsInput, PurchaseOrderUncheckedCreateWithoutLineItemsInput>
  }

  export type FileAttachmentCreateWithoutLineItemInput = {
    id?: string
    fileName: string
    fileType: string
    fileUrl: string
    uploadedBy: string
    description?: string | null
    createdAt?: Date | string
  }

  export type FileAttachmentUncheckedCreateWithoutLineItemInput = {
    id?: string
    fileName: string
    fileType: string
    fileUrl: string
    uploadedBy: string
    description?: string | null
    createdAt?: Date | string
  }

  export type FileAttachmentCreateOrConnectWithoutLineItemInput = {
    where: FileAttachmentWhereUniqueInput
    create: XOR<FileAttachmentCreateWithoutLineItemInput, FileAttachmentUncheckedCreateWithoutLineItemInput>
  }

  export type FileAttachmentCreateManyLineItemInputEnvelope = {
    data: FileAttachmentCreateManyLineItemInput | FileAttachmentCreateManyLineItemInput[]
    skipDuplicates?: boolean
  }

  export type BatchCreateWithoutLineItemInput = {
    id?: string
    batchId: string
    quantity: number
    startDate?: Date | string | null
    estimatedCompletion?: Date | string | null
    actualCompletion?: Date | string | null
    priority?: $Enums.BatchPriority
    status?: $Enums.BatchStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    routingSteps?: RoutingStepCreateNestedManyWithoutBatchInput
    qcRecords?: QCRecordCreateNestedManyWithoutBatchInput
  }

  export type BatchUncheckedCreateWithoutLineItemInput = {
    id?: string
    batchId: string
    quantity: number
    startDate?: Date | string | null
    estimatedCompletion?: Date | string | null
    actualCompletion?: Date | string | null
    priority?: $Enums.BatchPriority
    status?: $Enums.BatchStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    routingSteps?: RoutingStepUncheckedCreateNestedManyWithoutBatchInput
    qcRecords?: QCRecordUncheckedCreateNestedManyWithoutBatchInput
  }

  export type BatchCreateOrConnectWithoutLineItemInput = {
    where: BatchWhereUniqueInput
    create: XOR<BatchCreateWithoutLineItemInput, BatchUncheckedCreateWithoutLineItemInput>
  }

  export type BatchCreateManyLineItemInputEnvelope = {
    data: BatchCreateManyLineItemInput | BatchCreateManyLineItemInput[]
    skipDuplicates?: boolean
  }

  export type PurchaseOrderUpsertWithoutLineItemsInput = {
    update: XOR<PurchaseOrderUpdateWithoutLineItemsInput, PurchaseOrderUncheckedUpdateWithoutLineItemsInput>
    create: XOR<PurchaseOrderCreateWithoutLineItemsInput, PurchaseOrderUncheckedCreateWithoutLineItemsInput>
    where?: PurchaseOrderWhereInput
  }

  export type PurchaseOrderUpdateToOneWithWhereWithoutLineItemsInput = {
    where?: PurchaseOrderWhereInput
    data: XOR<PurchaseOrderUpdateWithoutLineItemsInput, PurchaseOrderUncheckedUpdateWithoutLineItemsInput>
  }

  export type PurchaseOrderUpdateWithoutLineItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    systemOrderId?: StringFieldUpdateOperationsInput | string
    poNumber?: StringFieldUpdateOperationsInput | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    priority?: EnumOrderPriorityFieldUpdateOperationsInput | $Enums.OrderPriority
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutPurchaseOrdersNestedInput
  }

  export type PurchaseOrderUncheckedUpdateWithoutLineItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    systemOrderId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    poNumber?: StringFieldUpdateOperationsInput | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    priority?: EnumOrderPriorityFieldUpdateOperationsInput | $Enums.OrderPriority
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileAttachmentUpsertWithWhereUniqueWithoutLineItemInput = {
    where: FileAttachmentWhereUniqueInput
    update: XOR<FileAttachmentUpdateWithoutLineItemInput, FileAttachmentUncheckedUpdateWithoutLineItemInput>
    create: XOR<FileAttachmentCreateWithoutLineItemInput, FileAttachmentUncheckedCreateWithoutLineItemInput>
  }

  export type FileAttachmentUpdateWithWhereUniqueWithoutLineItemInput = {
    where: FileAttachmentWhereUniqueInput
    data: XOR<FileAttachmentUpdateWithoutLineItemInput, FileAttachmentUncheckedUpdateWithoutLineItemInput>
  }

  export type FileAttachmentUpdateManyWithWhereWithoutLineItemInput = {
    where: FileAttachmentScalarWhereInput
    data: XOR<FileAttachmentUpdateManyMutationInput, FileAttachmentUncheckedUpdateManyWithoutLineItemInput>
  }

  export type FileAttachmentScalarWhereInput = {
    AND?: FileAttachmentScalarWhereInput | FileAttachmentScalarWhereInput[]
    OR?: FileAttachmentScalarWhereInput[]
    NOT?: FileAttachmentScalarWhereInput | FileAttachmentScalarWhereInput[]
    id?: StringFilter<"FileAttachment"> | string
    lineItemId?: StringFilter<"FileAttachment"> | string
    fileName?: StringFilter<"FileAttachment"> | string
    fileType?: StringFilter<"FileAttachment"> | string
    fileUrl?: StringFilter<"FileAttachment"> | string
    uploadedBy?: StringFilter<"FileAttachment"> | string
    description?: StringNullableFilter<"FileAttachment"> | string | null
    createdAt?: DateTimeFilter<"FileAttachment"> | Date | string
  }

  export type BatchUpsertWithWhereUniqueWithoutLineItemInput = {
    where: BatchWhereUniqueInput
    update: XOR<BatchUpdateWithoutLineItemInput, BatchUncheckedUpdateWithoutLineItemInput>
    create: XOR<BatchCreateWithoutLineItemInput, BatchUncheckedCreateWithoutLineItemInput>
  }

  export type BatchUpdateWithWhereUniqueWithoutLineItemInput = {
    where: BatchWhereUniqueInput
    data: XOR<BatchUpdateWithoutLineItemInput, BatchUncheckedUpdateWithoutLineItemInput>
  }

  export type BatchUpdateManyWithWhereWithoutLineItemInput = {
    where: BatchScalarWhereInput
    data: XOR<BatchUpdateManyMutationInput, BatchUncheckedUpdateManyWithoutLineItemInput>
  }

  export type BatchScalarWhereInput = {
    AND?: BatchScalarWhereInput | BatchScalarWhereInput[]
    OR?: BatchScalarWhereInput[]
    NOT?: BatchScalarWhereInput | BatchScalarWhereInput[]
    id?: StringFilter<"Batch"> | string
    batchId?: StringFilter<"Batch"> | string
    lineItemId?: StringFilter<"Batch"> | string
    quantity?: IntFilter<"Batch"> | number
    startDate?: DateTimeNullableFilter<"Batch"> | Date | string | null
    estimatedCompletion?: DateTimeNullableFilter<"Batch"> | Date | string | null
    actualCompletion?: DateTimeNullableFilter<"Batch"> | Date | string | null
    priority?: EnumBatchPriorityFilter<"Batch"> | $Enums.BatchPriority
    status?: EnumBatchStatusFilter<"Batch"> | $Enums.BatchStatus
    notes?: StringNullableFilter<"Batch"> | string | null
    createdAt?: DateTimeFilter<"Batch"> | Date | string
    updatedAt?: DateTimeFilter<"Batch"> | Date | string
  }

  export type OrderLineItemCreateWithoutFileAttachmentsInput = {
    id?: string
    partNumber: string
    partName: string
    drawingNumber?: string | null
    revisionLevel?: string | null
    quantity: number
    dueDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    purchaseOrder: PurchaseOrderCreateNestedOneWithoutLineItemsInput
    batches?: BatchCreateNestedManyWithoutLineItemInput
  }

  export type OrderLineItemUncheckedCreateWithoutFileAttachmentsInput = {
    id?: string
    orderId: string
    partNumber: string
    partName: string
    drawingNumber?: string | null
    revisionLevel?: string | null
    quantity: number
    dueDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    batches?: BatchUncheckedCreateNestedManyWithoutLineItemInput
  }

  export type OrderLineItemCreateOrConnectWithoutFileAttachmentsInput = {
    where: OrderLineItemWhereUniqueInput
    create: XOR<OrderLineItemCreateWithoutFileAttachmentsInput, OrderLineItemUncheckedCreateWithoutFileAttachmentsInput>
  }

  export type OrderLineItemUpsertWithoutFileAttachmentsInput = {
    update: XOR<OrderLineItemUpdateWithoutFileAttachmentsInput, OrderLineItemUncheckedUpdateWithoutFileAttachmentsInput>
    create: XOR<OrderLineItemCreateWithoutFileAttachmentsInput, OrderLineItemUncheckedCreateWithoutFileAttachmentsInput>
    where?: OrderLineItemWhereInput
  }

  export type OrderLineItemUpdateToOneWithWhereWithoutFileAttachmentsInput = {
    where?: OrderLineItemWhereInput
    data: XOR<OrderLineItemUpdateWithoutFileAttachmentsInput, OrderLineItemUncheckedUpdateWithoutFileAttachmentsInput>
  }

  export type OrderLineItemUpdateWithoutFileAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    drawingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    revisionLevel?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchaseOrder?: PurchaseOrderUpdateOneRequiredWithoutLineItemsNestedInput
    batches?: BatchUpdateManyWithoutLineItemNestedInput
  }

  export type OrderLineItemUncheckedUpdateWithoutFileAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    drawingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    revisionLevel?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    batches?: BatchUncheckedUpdateManyWithoutLineItemNestedInput
  }

  export type OrderLineItemCreateWithoutBatchesInput = {
    id?: string
    partNumber: string
    partName: string
    drawingNumber?: string | null
    revisionLevel?: string | null
    quantity: number
    dueDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    purchaseOrder: PurchaseOrderCreateNestedOneWithoutLineItemsInput
    fileAttachments?: FileAttachmentCreateNestedManyWithoutLineItemInput
  }

  export type OrderLineItemUncheckedCreateWithoutBatchesInput = {
    id?: string
    orderId: string
    partNumber: string
    partName: string
    drawingNumber?: string | null
    revisionLevel?: string | null
    quantity: number
    dueDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fileAttachments?: FileAttachmentUncheckedCreateNestedManyWithoutLineItemInput
  }

  export type OrderLineItemCreateOrConnectWithoutBatchesInput = {
    where: OrderLineItemWhereUniqueInput
    create: XOR<OrderLineItemCreateWithoutBatchesInput, OrderLineItemUncheckedCreateWithoutBatchesInput>
  }

  export type RoutingStepCreateWithoutBatchInput = {
    id?: string
    stepNumber: number
    description: string
    required?: boolean
    estimatedTime?: number | null
    notes?: string | null
    status?: $Enums.StepStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    workstation: WorkstationCreateNestedOneWithoutRoutingStepsInput
    confirmations?: StepConfirmationCreateNestedManyWithoutRoutingStepInput
  }

  export type RoutingStepUncheckedCreateWithoutBatchInput = {
    id?: string
    stepNumber: number
    workstationId: string
    description: string
    required?: boolean
    estimatedTime?: number | null
    notes?: string | null
    status?: $Enums.StepStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    confirmations?: StepConfirmationUncheckedCreateNestedManyWithoutRoutingStepInput
  }

  export type RoutingStepCreateOrConnectWithoutBatchInput = {
    where: RoutingStepWhereUniqueInput
    create: XOR<RoutingStepCreateWithoutBatchInput, RoutingStepUncheckedCreateWithoutBatchInput>
  }

  export type RoutingStepCreateManyBatchInputEnvelope = {
    data: RoutingStepCreateManyBatchInput | RoutingStepCreateManyBatchInput[]
    skipDuplicates?: boolean
  }

  export type QCRecordCreateWithoutBatchInput = {
    id?: string
    inspector: string
    inspectionDate?: Date | string
    result: $Enums.QCResult
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QCRecordUncheckedCreateWithoutBatchInput = {
    id?: string
    inspector: string
    inspectionDate?: Date | string
    result: $Enums.QCResult
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QCRecordCreateOrConnectWithoutBatchInput = {
    where: QCRecordWhereUniqueInput
    create: XOR<QCRecordCreateWithoutBatchInput, QCRecordUncheckedCreateWithoutBatchInput>
  }

  export type QCRecordCreateManyBatchInputEnvelope = {
    data: QCRecordCreateManyBatchInput | QCRecordCreateManyBatchInput[]
    skipDuplicates?: boolean
  }

  export type OrderLineItemUpsertWithoutBatchesInput = {
    update: XOR<OrderLineItemUpdateWithoutBatchesInput, OrderLineItemUncheckedUpdateWithoutBatchesInput>
    create: XOR<OrderLineItemCreateWithoutBatchesInput, OrderLineItemUncheckedCreateWithoutBatchesInput>
    where?: OrderLineItemWhereInput
  }

  export type OrderLineItemUpdateToOneWithWhereWithoutBatchesInput = {
    where?: OrderLineItemWhereInput
    data: XOR<OrderLineItemUpdateWithoutBatchesInput, OrderLineItemUncheckedUpdateWithoutBatchesInput>
  }

  export type OrderLineItemUpdateWithoutBatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    drawingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    revisionLevel?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchaseOrder?: PurchaseOrderUpdateOneRequiredWithoutLineItemsNestedInput
    fileAttachments?: FileAttachmentUpdateManyWithoutLineItemNestedInput
  }

  export type OrderLineItemUncheckedUpdateWithoutBatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    drawingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    revisionLevel?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fileAttachments?: FileAttachmentUncheckedUpdateManyWithoutLineItemNestedInput
  }

  export type RoutingStepUpsertWithWhereUniqueWithoutBatchInput = {
    where: RoutingStepWhereUniqueInput
    update: XOR<RoutingStepUpdateWithoutBatchInput, RoutingStepUncheckedUpdateWithoutBatchInput>
    create: XOR<RoutingStepCreateWithoutBatchInput, RoutingStepUncheckedCreateWithoutBatchInput>
  }

  export type RoutingStepUpdateWithWhereUniqueWithoutBatchInput = {
    where: RoutingStepWhereUniqueInput
    data: XOR<RoutingStepUpdateWithoutBatchInput, RoutingStepUncheckedUpdateWithoutBatchInput>
  }

  export type RoutingStepUpdateManyWithWhereWithoutBatchInput = {
    where: RoutingStepScalarWhereInput
    data: XOR<RoutingStepUpdateManyMutationInput, RoutingStepUncheckedUpdateManyWithoutBatchInput>
  }

  export type RoutingStepScalarWhereInput = {
    AND?: RoutingStepScalarWhereInput | RoutingStepScalarWhereInput[]
    OR?: RoutingStepScalarWhereInput[]
    NOT?: RoutingStepScalarWhereInput | RoutingStepScalarWhereInput[]
    id?: StringFilter<"RoutingStep"> | string
    batchId?: StringFilter<"RoutingStep"> | string
    stepNumber?: IntFilter<"RoutingStep"> | number
    workstationId?: StringFilter<"RoutingStep"> | string
    description?: StringFilter<"RoutingStep"> | string
    required?: BoolFilter<"RoutingStep"> | boolean
    estimatedTime?: IntNullableFilter<"RoutingStep"> | number | null
    notes?: StringNullableFilter<"RoutingStep"> | string | null
    status?: EnumStepStatusFilter<"RoutingStep"> | $Enums.StepStatus
    createdAt?: DateTimeFilter<"RoutingStep"> | Date | string
    updatedAt?: DateTimeFilter<"RoutingStep"> | Date | string
  }

  export type QCRecordUpsertWithWhereUniqueWithoutBatchInput = {
    where: QCRecordWhereUniqueInput
    update: XOR<QCRecordUpdateWithoutBatchInput, QCRecordUncheckedUpdateWithoutBatchInput>
    create: XOR<QCRecordCreateWithoutBatchInput, QCRecordUncheckedCreateWithoutBatchInput>
  }

  export type QCRecordUpdateWithWhereUniqueWithoutBatchInput = {
    where: QCRecordWhereUniqueInput
    data: XOR<QCRecordUpdateWithoutBatchInput, QCRecordUncheckedUpdateWithoutBatchInput>
  }

  export type QCRecordUpdateManyWithWhereWithoutBatchInput = {
    where: QCRecordScalarWhereInput
    data: XOR<QCRecordUpdateManyMutationInput, QCRecordUncheckedUpdateManyWithoutBatchInput>
  }

  export type QCRecordScalarWhereInput = {
    AND?: QCRecordScalarWhereInput | QCRecordScalarWhereInput[]
    OR?: QCRecordScalarWhereInput[]
    NOT?: QCRecordScalarWhereInput | QCRecordScalarWhereInput[]
    id?: StringFilter<"QCRecord"> | string
    batchId?: StringFilter<"QCRecord"> | string
    inspector?: StringFilter<"QCRecord"> | string
    inspectionDate?: DateTimeFilter<"QCRecord"> | Date | string
    result?: EnumQCResultFilter<"QCRecord"> | $Enums.QCResult
    notes?: StringNullableFilter<"QCRecord"> | string | null
    createdAt?: DateTimeFilter<"QCRecord"> | Date | string
    updatedAt?: DateTimeFilter<"QCRecord"> | Date | string
  }

  export type BatchCreateWithoutRoutingStepsInput = {
    id?: string
    batchId: string
    quantity: number
    startDate?: Date | string | null
    estimatedCompletion?: Date | string | null
    actualCompletion?: Date | string | null
    priority?: $Enums.BatchPriority
    status?: $Enums.BatchStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lineItem: OrderLineItemCreateNestedOneWithoutBatchesInput
    qcRecords?: QCRecordCreateNestedManyWithoutBatchInput
  }

  export type BatchUncheckedCreateWithoutRoutingStepsInput = {
    id?: string
    batchId: string
    lineItemId: string
    quantity: number
    startDate?: Date | string | null
    estimatedCompletion?: Date | string | null
    actualCompletion?: Date | string | null
    priority?: $Enums.BatchPriority
    status?: $Enums.BatchStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    qcRecords?: QCRecordUncheckedCreateNestedManyWithoutBatchInput
  }

  export type BatchCreateOrConnectWithoutRoutingStepsInput = {
    where: BatchWhereUniqueInput
    create: XOR<BatchCreateWithoutRoutingStepsInput, BatchUncheckedCreateWithoutRoutingStepsInput>
  }

  export type WorkstationCreateWithoutRoutingStepsInput = {
    id?: string
    name: string
    description?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    confirmations?: StepConfirmationCreateNestedManyWithoutWorkstationInput
  }

  export type WorkstationUncheckedCreateWithoutRoutingStepsInput = {
    id?: string
    name: string
    description?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    confirmations?: StepConfirmationUncheckedCreateNestedManyWithoutWorkstationInput
  }

  export type WorkstationCreateOrConnectWithoutRoutingStepsInput = {
    where: WorkstationWhereUniqueInput
    create: XOR<WorkstationCreateWithoutRoutingStepsInput, WorkstationUncheckedCreateWithoutRoutingStepsInput>
  }

  export type StepConfirmationCreateWithoutRoutingStepInput = {
    id?: string
    operatorName: string
    operatorId?: string | null
    startTime?: Date | string | null
    endTime?: Date | string | null
    notes?: string | null
    photoUrl?: string | null
    flagged?: boolean
    status?: $Enums.ConfirmationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    workstation: WorkstationCreateNestedOneWithoutConfirmationsInput
  }

  export type StepConfirmationUncheckedCreateWithoutRoutingStepInput = {
    id?: string
    workstationId: string
    operatorName: string
    operatorId?: string | null
    startTime?: Date | string | null
    endTime?: Date | string | null
    notes?: string | null
    photoUrl?: string | null
    flagged?: boolean
    status?: $Enums.ConfirmationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StepConfirmationCreateOrConnectWithoutRoutingStepInput = {
    where: StepConfirmationWhereUniqueInput
    create: XOR<StepConfirmationCreateWithoutRoutingStepInput, StepConfirmationUncheckedCreateWithoutRoutingStepInput>
  }

  export type StepConfirmationCreateManyRoutingStepInputEnvelope = {
    data: StepConfirmationCreateManyRoutingStepInput | StepConfirmationCreateManyRoutingStepInput[]
    skipDuplicates?: boolean
  }

  export type BatchUpsertWithoutRoutingStepsInput = {
    update: XOR<BatchUpdateWithoutRoutingStepsInput, BatchUncheckedUpdateWithoutRoutingStepsInput>
    create: XOR<BatchCreateWithoutRoutingStepsInput, BatchUncheckedCreateWithoutRoutingStepsInput>
    where?: BatchWhereInput
  }

  export type BatchUpdateToOneWithWhereWithoutRoutingStepsInput = {
    where?: BatchWhereInput
    data: XOR<BatchUpdateWithoutRoutingStepsInput, BatchUncheckedUpdateWithoutRoutingStepsInput>
  }

  export type BatchUpdateWithoutRoutingStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedCompletion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualCompletion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumBatchPriorityFieldUpdateOperationsInput | $Enums.BatchPriority
    status?: EnumBatchStatusFieldUpdateOperationsInput | $Enums.BatchStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lineItem?: OrderLineItemUpdateOneRequiredWithoutBatchesNestedInput
    qcRecords?: QCRecordUpdateManyWithoutBatchNestedInput
  }

  export type BatchUncheckedUpdateWithoutRoutingStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    lineItemId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedCompletion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualCompletion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumBatchPriorityFieldUpdateOperationsInput | $Enums.BatchPriority
    status?: EnumBatchStatusFieldUpdateOperationsInput | $Enums.BatchStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    qcRecords?: QCRecordUncheckedUpdateManyWithoutBatchNestedInput
  }

  export type WorkstationUpsertWithoutRoutingStepsInput = {
    update: XOR<WorkstationUpdateWithoutRoutingStepsInput, WorkstationUncheckedUpdateWithoutRoutingStepsInput>
    create: XOR<WorkstationCreateWithoutRoutingStepsInput, WorkstationUncheckedCreateWithoutRoutingStepsInput>
    where?: WorkstationWhereInput
  }

  export type WorkstationUpdateToOneWithWhereWithoutRoutingStepsInput = {
    where?: WorkstationWhereInput
    data: XOR<WorkstationUpdateWithoutRoutingStepsInput, WorkstationUncheckedUpdateWithoutRoutingStepsInput>
  }

  export type WorkstationUpdateWithoutRoutingStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmations?: StepConfirmationUpdateManyWithoutWorkstationNestedInput
  }

  export type WorkstationUncheckedUpdateWithoutRoutingStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmations?: StepConfirmationUncheckedUpdateManyWithoutWorkstationNestedInput
  }

  export type StepConfirmationUpsertWithWhereUniqueWithoutRoutingStepInput = {
    where: StepConfirmationWhereUniqueInput
    update: XOR<StepConfirmationUpdateWithoutRoutingStepInput, StepConfirmationUncheckedUpdateWithoutRoutingStepInput>
    create: XOR<StepConfirmationCreateWithoutRoutingStepInput, StepConfirmationUncheckedCreateWithoutRoutingStepInput>
  }

  export type StepConfirmationUpdateWithWhereUniqueWithoutRoutingStepInput = {
    where: StepConfirmationWhereUniqueInput
    data: XOR<StepConfirmationUpdateWithoutRoutingStepInput, StepConfirmationUncheckedUpdateWithoutRoutingStepInput>
  }

  export type StepConfirmationUpdateManyWithWhereWithoutRoutingStepInput = {
    where: StepConfirmationScalarWhereInput
    data: XOR<StepConfirmationUpdateManyMutationInput, StepConfirmationUncheckedUpdateManyWithoutRoutingStepInput>
  }

  export type StepConfirmationScalarWhereInput = {
    AND?: StepConfirmationScalarWhereInput | StepConfirmationScalarWhereInput[]
    OR?: StepConfirmationScalarWhereInput[]
    NOT?: StepConfirmationScalarWhereInput | StepConfirmationScalarWhereInput[]
    id?: StringFilter<"StepConfirmation"> | string
    stepId?: StringFilter<"StepConfirmation"> | string
    workstationId?: StringFilter<"StepConfirmation"> | string
    operatorName?: StringFilter<"StepConfirmation"> | string
    operatorId?: StringNullableFilter<"StepConfirmation"> | string | null
    startTime?: DateTimeNullableFilter<"StepConfirmation"> | Date | string | null
    endTime?: DateTimeNullableFilter<"StepConfirmation"> | Date | string | null
    notes?: StringNullableFilter<"StepConfirmation"> | string | null
    photoUrl?: StringNullableFilter<"StepConfirmation"> | string | null
    flagged?: BoolFilter<"StepConfirmation"> | boolean
    status?: EnumConfirmationStatusFilter<"StepConfirmation"> | $Enums.ConfirmationStatus
    createdAt?: DateTimeFilter<"StepConfirmation"> | Date | string
    updatedAt?: DateTimeFilter<"StepConfirmation"> | Date | string
  }

  export type RoutingStepCreateWithoutWorkstationInput = {
    id?: string
    stepNumber: number
    description: string
    required?: boolean
    estimatedTime?: number | null
    notes?: string | null
    status?: $Enums.StepStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    batch: BatchCreateNestedOneWithoutRoutingStepsInput
    confirmations?: StepConfirmationCreateNestedManyWithoutRoutingStepInput
  }

  export type RoutingStepUncheckedCreateWithoutWorkstationInput = {
    id?: string
    batchId: string
    stepNumber: number
    description: string
    required?: boolean
    estimatedTime?: number | null
    notes?: string | null
    status?: $Enums.StepStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    confirmations?: StepConfirmationUncheckedCreateNestedManyWithoutRoutingStepInput
  }

  export type RoutingStepCreateOrConnectWithoutWorkstationInput = {
    where: RoutingStepWhereUniqueInput
    create: XOR<RoutingStepCreateWithoutWorkstationInput, RoutingStepUncheckedCreateWithoutWorkstationInput>
  }

  export type RoutingStepCreateManyWorkstationInputEnvelope = {
    data: RoutingStepCreateManyWorkstationInput | RoutingStepCreateManyWorkstationInput[]
    skipDuplicates?: boolean
  }

  export type StepConfirmationCreateWithoutWorkstationInput = {
    id?: string
    operatorName: string
    operatorId?: string | null
    startTime?: Date | string | null
    endTime?: Date | string | null
    notes?: string | null
    photoUrl?: string | null
    flagged?: boolean
    status?: $Enums.ConfirmationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    routingStep: RoutingStepCreateNestedOneWithoutConfirmationsInput
  }

  export type StepConfirmationUncheckedCreateWithoutWorkstationInput = {
    id?: string
    stepId: string
    operatorName: string
    operatorId?: string | null
    startTime?: Date | string | null
    endTime?: Date | string | null
    notes?: string | null
    photoUrl?: string | null
    flagged?: boolean
    status?: $Enums.ConfirmationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StepConfirmationCreateOrConnectWithoutWorkstationInput = {
    where: StepConfirmationWhereUniqueInput
    create: XOR<StepConfirmationCreateWithoutWorkstationInput, StepConfirmationUncheckedCreateWithoutWorkstationInput>
  }

  export type StepConfirmationCreateManyWorkstationInputEnvelope = {
    data: StepConfirmationCreateManyWorkstationInput | StepConfirmationCreateManyWorkstationInput[]
    skipDuplicates?: boolean
  }

  export type RoutingStepUpsertWithWhereUniqueWithoutWorkstationInput = {
    where: RoutingStepWhereUniqueInput
    update: XOR<RoutingStepUpdateWithoutWorkstationInput, RoutingStepUncheckedUpdateWithoutWorkstationInput>
    create: XOR<RoutingStepCreateWithoutWorkstationInput, RoutingStepUncheckedCreateWithoutWorkstationInput>
  }

  export type RoutingStepUpdateWithWhereUniqueWithoutWorkstationInput = {
    where: RoutingStepWhereUniqueInput
    data: XOR<RoutingStepUpdateWithoutWorkstationInput, RoutingStepUncheckedUpdateWithoutWorkstationInput>
  }

  export type RoutingStepUpdateManyWithWhereWithoutWorkstationInput = {
    where: RoutingStepScalarWhereInput
    data: XOR<RoutingStepUpdateManyMutationInput, RoutingStepUncheckedUpdateManyWithoutWorkstationInput>
  }

  export type StepConfirmationUpsertWithWhereUniqueWithoutWorkstationInput = {
    where: StepConfirmationWhereUniqueInput
    update: XOR<StepConfirmationUpdateWithoutWorkstationInput, StepConfirmationUncheckedUpdateWithoutWorkstationInput>
    create: XOR<StepConfirmationCreateWithoutWorkstationInput, StepConfirmationUncheckedCreateWithoutWorkstationInput>
  }

  export type StepConfirmationUpdateWithWhereUniqueWithoutWorkstationInput = {
    where: StepConfirmationWhereUniqueInput
    data: XOR<StepConfirmationUpdateWithoutWorkstationInput, StepConfirmationUncheckedUpdateWithoutWorkstationInput>
  }

  export type StepConfirmationUpdateManyWithWhereWithoutWorkstationInput = {
    where: StepConfirmationScalarWhereInput
    data: XOR<StepConfirmationUpdateManyMutationInput, StepConfirmationUncheckedUpdateManyWithoutWorkstationInput>
  }

  export type RoutingStepCreateWithoutConfirmationsInput = {
    id?: string
    stepNumber: number
    description: string
    required?: boolean
    estimatedTime?: number | null
    notes?: string | null
    status?: $Enums.StepStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    batch: BatchCreateNestedOneWithoutRoutingStepsInput
    workstation: WorkstationCreateNestedOneWithoutRoutingStepsInput
  }

  export type RoutingStepUncheckedCreateWithoutConfirmationsInput = {
    id?: string
    batchId: string
    stepNumber: number
    workstationId: string
    description: string
    required?: boolean
    estimatedTime?: number | null
    notes?: string | null
    status?: $Enums.StepStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoutingStepCreateOrConnectWithoutConfirmationsInput = {
    where: RoutingStepWhereUniqueInput
    create: XOR<RoutingStepCreateWithoutConfirmationsInput, RoutingStepUncheckedCreateWithoutConfirmationsInput>
  }

  export type WorkstationCreateWithoutConfirmationsInput = {
    id?: string
    name: string
    description?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    routingSteps?: RoutingStepCreateNestedManyWithoutWorkstationInput
  }

  export type WorkstationUncheckedCreateWithoutConfirmationsInput = {
    id?: string
    name: string
    description?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    routingSteps?: RoutingStepUncheckedCreateNestedManyWithoutWorkstationInput
  }

  export type WorkstationCreateOrConnectWithoutConfirmationsInput = {
    where: WorkstationWhereUniqueInput
    create: XOR<WorkstationCreateWithoutConfirmationsInput, WorkstationUncheckedCreateWithoutConfirmationsInput>
  }

  export type RoutingStepUpsertWithoutConfirmationsInput = {
    update: XOR<RoutingStepUpdateWithoutConfirmationsInput, RoutingStepUncheckedUpdateWithoutConfirmationsInput>
    create: XOR<RoutingStepCreateWithoutConfirmationsInput, RoutingStepUncheckedCreateWithoutConfirmationsInput>
    where?: RoutingStepWhereInput
  }

  export type RoutingStepUpdateToOneWithWhereWithoutConfirmationsInput = {
    where?: RoutingStepWhereInput
    data: XOR<RoutingStepUpdateWithoutConfirmationsInput, RoutingStepUncheckedUpdateWithoutConfirmationsInput>
  }

  export type RoutingStepUpdateWithoutConfirmationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepNumber?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStepStatusFieldUpdateOperationsInput | $Enums.StepStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    batch?: BatchUpdateOneRequiredWithoutRoutingStepsNestedInput
    workstation?: WorkstationUpdateOneRequiredWithoutRoutingStepsNestedInput
  }

  export type RoutingStepUncheckedUpdateWithoutConfirmationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    stepNumber?: IntFieldUpdateOperationsInput | number
    workstationId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStepStatusFieldUpdateOperationsInput | $Enums.StepStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkstationUpsertWithoutConfirmationsInput = {
    update: XOR<WorkstationUpdateWithoutConfirmationsInput, WorkstationUncheckedUpdateWithoutConfirmationsInput>
    create: XOR<WorkstationCreateWithoutConfirmationsInput, WorkstationUncheckedCreateWithoutConfirmationsInput>
    where?: WorkstationWhereInput
  }

  export type WorkstationUpdateToOneWithWhereWithoutConfirmationsInput = {
    where?: WorkstationWhereInput
    data: XOR<WorkstationUpdateWithoutConfirmationsInput, WorkstationUncheckedUpdateWithoutConfirmationsInput>
  }

  export type WorkstationUpdateWithoutConfirmationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    routingSteps?: RoutingStepUpdateManyWithoutWorkstationNestedInput
  }

  export type WorkstationUncheckedUpdateWithoutConfirmationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    routingSteps?: RoutingStepUncheckedUpdateManyWithoutWorkstationNestedInput
  }

  export type BatchCreateWithoutQcRecordsInput = {
    id?: string
    batchId: string
    quantity: number
    startDate?: Date | string | null
    estimatedCompletion?: Date | string | null
    actualCompletion?: Date | string | null
    priority?: $Enums.BatchPriority
    status?: $Enums.BatchStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lineItem: OrderLineItemCreateNestedOneWithoutBatchesInput
    routingSteps?: RoutingStepCreateNestedManyWithoutBatchInput
  }

  export type BatchUncheckedCreateWithoutQcRecordsInput = {
    id?: string
    batchId: string
    lineItemId: string
    quantity: number
    startDate?: Date | string | null
    estimatedCompletion?: Date | string | null
    actualCompletion?: Date | string | null
    priority?: $Enums.BatchPriority
    status?: $Enums.BatchStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    routingSteps?: RoutingStepUncheckedCreateNestedManyWithoutBatchInput
  }

  export type BatchCreateOrConnectWithoutQcRecordsInput = {
    where: BatchWhereUniqueInput
    create: XOR<BatchCreateWithoutQcRecordsInput, BatchUncheckedCreateWithoutQcRecordsInput>
  }

  export type BatchUpsertWithoutQcRecordsInput = {
    update: XOR<BatchUpdateWithoutQcRecordsInput, BatchUncheckedUpdateWithoutQcRecordsInput>
    create: XOR<BatchCreateWithoutQcRecordsInput, BatchUncheckedCreateWithoutQcRecordsInput>
    where?: BatchWhereInput
  }

  export type BatchUpdateToOneWithWhereWithoutQcRecordsInput = {
    where?: BatchWhereInput
    data: XOR<BatchUpdateWithoutQcRecordsInput, BatchUncheckedUpdateWithoutQcRecordsInput>
  }

  export type BatchUpdateWithoutQcRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedCompletion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualCompletion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumBatchPriorityFieldUpdateOperationsInput | $Enums.BatchPriority
    status?: EnumBatchStatusFieldUpdateOperationsInput | $Enums.BatchStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lineItem?: OrderLineItemUpdateOneRequiredWithoutBatchesNestedInput
    routingSteps?: RoutingStepUpdateManyWithoutBatchNestedInput
  }

  export type BatchUncheckedUpdateWithoutQcRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    lineItemId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedCompletion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualCompletion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumBatchPriorityFieldUpdateOperationsInput | $Enums.BatchPriority
    status?: EnumBatchStatusFieldUpdateOperationsInput | $Enums.BatchStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    routingSteps?: RoutingStepUncheckedUpdateManyWithoutBatchNestedInput
  }

  export type PurchaseOrderCreateManyCustomerInput = {
    id?: string
    systemOrderId?: string
    poNumber: string
    dueDate: Date | string
    priority?: $Enums.OrderPriority
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PurchaseOrderUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    systemOrderId?: StringFieldUpdateOperationsInput | string
    poNumber?: StringFieldUpdateOperationsInput | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    priority?: EnumOrderPriorityFieldUpdateOperationsInput | $Enums.OrderPriority
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lineItems?: OrderLineItemUpdateManyWithoutPurchaseOrderNestedInput
  }

  export type PurchaseOrderUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    systemOrderId?: StringFieldUpdateOperationsInput | string
    poNumber?: StringFieldUpdateOperationsInput | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    priority?: EnumOrderPriorityFieldUpdateOperationsInput | $Enums.OrderPriority
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lineItems?: OrderLineItemUncheckedUpdateManyWithoutPurchaseOrderNestedInput
  }

  export type PurchaseOrderUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    systemOrderId?: StringFieldUpdateOperationsInput | string
    poNumber?: StringFieldUpdateOperationsInput | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    priority?: EnumOrderPriorityFieldUpdateOperationsInput | $Enums.OrderPriority
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderLineItemCreateManyPurchaseOrderInput = {
    id?: string
    partNumber: string
    partName: string
    drawingNumber?: string | null
    revisionLevel?: string | null
    quantity: number
    dueDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderLineItemUpdateWithoutPurchaseOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    drawingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    revisionLevel?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fileAttachments?: FileAttachmentUpdateManyWithoutLineItemNestedInput
    batches?: BatchUpdateManyWithoutLineItemNestedInput
  }

  export type OrderLineItemUncheckedUpdateWithoutPurchaseOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    drawingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    revisionLevel?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fileAttachments?: FileAttachmentUncheckedUpdateManyWithoutLineItemNestedInput
    batches?: BatchUncheckedUpdateManyWithoutLineItemNestedInput
  }

  export type OrderLineItemUncheckedUpdateManyWithoutPurchaseOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    drawingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    revisionLevel?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileAttachmentCreateManyLineItemInput = {
    id?: string
    fileName: string
    fileType: string
    fileUrl: string
    uploadedBy: string
    description?: string | null
    createdAt?: Date | string
  }

  export type BatchCreateManyLineItemInput = {
    id?: string
    batchId: string
    quantity: number
    startDate?: Date | string | null
    estimatedCompletion?: Date | string | null
    actualCompletion?: Date | string | null
    priority?: $Enums.BatchPriority
    status?: $Enums.BatchStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FileAttachmentUpdateWithoutLineItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileAttachmentUncheckedUpdateWithoutLineItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileAttachmentUncheckedUpdateManyWithoutLineItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BatchUpdateWithoutLineItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedCompletion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualCompletion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumBatchPriorityFieldUpdateOperationsInput | $Enums.BatchPriority
    status?: EnumBatchStatusFieldUpdateOperationsInput | $Enums.BatchStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    routingSteps?: RoutingStepUpdateManyWithoutBatchNestedInput
    qcRecords?: QCRecordUpdateManyWithoutBatchNestedInput
  }

  export type BatchUncheckedUpdateWithoutLineItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedCompletion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualCompletion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumBatchPriorityFieldUpdateOperationsInput | $Enums.BatchPriority
    status?: EnumBatchStatusFieldUpdateOperationsInput | $Enums.BatchStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    routingSteps?: RoutingStepUncheckedUpdateManyWithoutBatchNestedInput
    qcRecords?: QCRecordUncheckedUpdateManyWithoutBatchNestedInput
  }

  export type BatchUncheckedUpdateManyWithoutLineItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedCompletion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualCompletion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumBatchPriorityFieldUpdateOperationsInput | $Enums.BatchPriority
    status?: EnumBatchStatusFieldUpdateOperationsInput | $Enums.BatchStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoutingStepCreateManyBatchInput = {
    id?: string
    stepNumber: number
    workstationId: string
    description: string
    required?: boolean
    estimatedTime?: number | null
    notes?: string | null
    status?: $Enums.StepStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QCRecordCreateManyBatchInput = {
    id?: string
    inspector: string
    inspectionDate?: Date | string
    result: $Enums.QCResult
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoutingStepUpdateWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepNumber?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStepStatusFieldUpdateOperationsInput | $Enums.StepStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workstation?: WorkstationUpdateOneRequiredWithoutRoutingStepsNestedInput
    confirmations?: StepConfirmationUpdateManyWithoutRoutingStepNestedInput
  }

  export type RoutingStepUncheckedUpdateWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepNumber?: IntFieldUpdateOperationsInput | number
    workstationId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStepStatusFieldUpdateOperationsInput | $Enums.StepStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmations?: StepConfirmationUncheckedUpdateManyWithoutRoutingStepNestedInput
  }

  export type RoutingStepUncheckedUpdateManyWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepNumber?: IntFieldUpdateOperationsInput | number
    workstationId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStepStatusFieldUpdateOperationsInput | $Enums.StepStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QCRecordUpdateWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    inspector?: StringFieldUpdateOperationsInput | string
    inspectionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    result?: EnumQCResultFieldUpdateOperationsInput | $Enums.QCResult
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QCRecordUncheckedUpdateWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    inspector?: StringFieldUpdateOperationsInput | string
    inspectionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    result?: EnumQCResultFieldUpdateOperationsInput | $Enums.QCResult
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QCRecordUncheckedUpdateManyWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    inspector?: StringFieldUpdateOperationsInput | string
    inspectionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    result?: EnumQCResultFieldUpdateOperationsInput | $Enums.QCResult
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StepConfirmationCreateManyRoutingStepInput = {
    id?: string
    workstationId: string
    operatorName: string
    operatorId?: string | null
    startTime?: Date | string | null
    endTime?: Date | string | null
    notes?: string | null
    photoUrl?: string | null
    flagged?: boolean
    status?: $Enums.ConfirmationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StepConfirmationUpdateWithoutRoutingStepInput = {
    id?: StringFieldUpdateOperationsInput | string
    operatorName?: StringFieldUpdateOperationsInput | string
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    flagged?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumConfirmationStatusFieldUpdateOperationsInput | $Enums.ConfirmationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workstation?: WorkstationUpdateOneRequiredWithoutConfirmationsNestedInput
  }

  export type StepConfirmationUncheckedUpdateWithoutRoutingStepInput = {
    id?: StringFieldUpdateOperationsInput | string
    workstationId?: StringFieldUpdateOperationsInput | string
    operatorName?: StringFieldUpdateOperationsInput | string
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    flagged?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumConfirmationStatusFieldUpdateOperationsInput | $Enums.ConfirmationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StepConfirmationUncheckedUpdateManyWithoutRoutingStepInput = {
    id?: StringFieldUpdateOperationsInput | string
    workstationId?: StringFieldUpdateOperationsInput | string
    operatorName?: StringFieldUpdateOperationsInput | string
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    flagged?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumConfirmationStatusFieldUpdateOperationsInput | $Enums.ConfirmationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoutingStepCreateManyWorkstationInput = {
    id?: string
    batchId: string
    stepNumber: number
    description: string
    required?: boolean
    estimatedTime?: number | null
    notes?: string | null
    status?: $Enums.StepStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StepConfirmationCreateManyWorkstationInput = {
    id?: string
    stepId: string
    operatorName: string
    operatorId?: string | null
    startTime?: Date | string | null
    endTime?: Date | string | null
    notes?: string | null
    photoUrl?: string | null
    flagged?: boolean
    status?: $Enums.ConfirmationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoutingStepUpdateWithoutWorkstationInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepNumber?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStepStatusFieldUpdateOperationsInput | $Enums.StepStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    batch?: BatchUpdateOneRequiredWithoutRoutingStepsNestedInput
    confirmations?: StepConfirmationUpdateManyWithoutRoutingStepNestedInput
  }

  export type RoutingStepUncheckedUpdateWithoutWorkstationInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    stepNumber?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStepStatusFieldUpdateOperationsInput | $Enums.StepStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmations?: StepConfirmationUncheckedUpdateManyWithoutRoutingStepNestedInput
  }

  export type RoutingStepUncheckedUpdateManyWithoutWorkstationInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    stepNumber?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStepStatusFieldUpdateOperationsInput | $Enums.StepStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StepConfirmationUpdateWithoutWorkstationInput = {
    id?: StringFieldUpdateOperationsInput | string
    operatorName?: StringFieldUpdateOperationsInput | string
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    flagged?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumConfirmationStatusFieldUpdateOperationsInput | $Enums.ConfirmationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    routingStep?: RoutingStepUpdateOneRequiredWithoutConfirmationsNestedInput
  }

  export type StepConfirmationUncheckedUpdateWithoutWorkstationInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepId?: StringFieldUpdateOperationsInput | string
    operatorName?: StringFieldUpdateOperationsInput | string
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    flagged?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumConfirmationStatusFieldUpdateOperationsInput | $Enums.ConfirmationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StepConfirmationUncheckedUpdateManyWithoutWorkstationInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepId?: StringFieldUpdateOperationsInput | string
    operatorName?: StringFieldUpdateOperationsInput | string
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    flagged?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumConfirmationStatusFieldUpdateOperationsInput | $Enums.ConfirmationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}