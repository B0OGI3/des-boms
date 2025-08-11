
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
 * Model Part
 * 
 */
export type Part = $Result.DefaultSelection<Prisma.$PartPayload>
/**
 * Model BOMComponent
 * 
 */
export type BOMComponent = $Result.DefaultSelection<Prisma.$BOMComponentPayload>
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
 * Model MaterialConsumption
 * 
 */
export type MaterialConsumption = $Result.DefaultSelection<Prisma.$MaterialConsumptionPayload>
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
  export const PartType: {
  FINISHED: 'FINISHED',
  SEMI_FINISHED: 'SEMI_FINISHED',
  RAW_MATERIAL: 'RAW_MATERIAL'
};

export type PartType = (typeof PartType)[keyof typeof PartType]


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

export type PartType = $Enums.PartType

export const PartType: typeof $Enums.PartType

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
   * `prisma.part`: Exposes CRUD operations for the **Part** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Parts
    * const parts = await prisma.part.findMany()
    * ```
    */
  get part(): Prisma.PartDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bOMComponent`: Exposes CRUD operations for the **BOMComponent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BOMComponents
    * const bOMComponents = await prisma.bOMComponent.findMany()
    * ```
    */
  get bOMComponent(): Prisma.BOMComponentDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.materialConsumption`: Exposes CRUD operations for the **MaterialConsumption** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MaterialConsumptions
    * const materialConsumptions = await prisma.materialConsumption.findMany()
    * ```
    */
  get materialConsumption(): Prisma.MaterialConsumptionDelegate<ExtArgs, ClientOptions>;

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
    Part: 'Part',
    BOMComponent: 'BOMComponent',
    OrderLineItem: 'OrderLineItem',
    FileAttachment: 'FileAttachment',
    Batch: 'Batch',
    MaterialConsumption: 'MaterialConsumption',
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
      modelProps: "customer" | "purchaseOrder" | "part" | "bOMComponent" | "orderLineItem" | "fileAttachment" | "batch" | "materialConsumption" | "routingStep" | "workstation" | "stepConfirmation" | "qCRecord"
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
      Part: {
        payload: Prisma.$PartPayload<ExtArgs>
        fields: Prisma.PartFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PartFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PartFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          findFirst: {
            args: Prisma.PartFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PartFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          findMany: {
            args: Prisma.PartFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>[]
          }
          create: {
            args: Prisma.PartCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          createMany: {
            args: Prisma.PartCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PartCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>[]
          }
          delete: {
            args: Prisma.PartDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          update: {
            args: Prisma.PartUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          deleteMany: {
            args: Prisma.PartDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PartUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PartUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>[]
          }
          upsert: {
            args: Prisma.PartUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          aggregate: {
            args: Prisma.PartAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePart>
          }
          groupBy: {
            args: Prisma.PartGroupByArgs<ExtArgs>
            result: $Utils.Optional<PartGroupByOutputType>[]
          }
          count: {
            args: Prisma.PartCountArgs<ExtArgs>
            result: $Utils.Optional<PartCountAggregateOutputType> | number
          }
        }
      }
      BOMComponent: {
        payload: Prisma.$BOMComponentPayload<ExtArgs>
        fields: Prisma.BOMComponentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BOMComponentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BOMComponentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BOMComponentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BOMComponentPayload>
          }
          findFirst: {
            args: Prisma.BOMComponentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BOMComponentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BOMComponentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BOMComponentPayload>
          }
          findMany: {
            args: Prisma.BOMComponentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BOMComponentPayload>[]
          }
          create: {
            args: Prisma.BOMComponentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BOMComponentPayload>
          }
          createMany: {
            args: Prisma.BOMComponentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BOMComponentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BOMComponentPayload>[]
          }
          delete: {
            args: Prisma.BOMComponentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BOMComponentPayload>
          }
          update: {
            args: Prisma.BOMComponentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BOMComponentPayload>
          }
          deleteMany: {
            args: Prisma.BOMComponentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BOMComponentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BOMComponentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BOMComponentPayload>[]
          }
          upsert: {
            args: Prisma.BOMComponentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BOMComponentPayload>
          }
          aggregate: {
            args: Prisma.BOMComponentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBOMComponent>
          }
          groupBy: {
            args: Prisma.BOMComponentGroupByArgs<ExtArgs>
            result: $Utils.Optional<BOMComponentGroupByOutputType>[]
          }
          count: {
            args: Prisma.BOMComponentCountArgs<ExtArgs>
            result: $Utils.Optional<BOMComponentCountAggregateOutputType> | number
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
      MaterialConsumption: {
        payload: Prisma.$MaterialConsumptionPayload<ExtArgs>
        fields: Prisma.MaterialConsumptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MaterialConsumptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialConsumptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MaterialConsumptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialConsumptionPayload>
          }
          findFirst: {
            args: Prisma.MaterialConsumptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialConsumptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MaterialConsumptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialConsumptionPayload>
          }
          findMany: {
            args: Prisma.MaterialConsumptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialConsumptionPayload>[]
          }
          create: {
            args: Prisma.MaterialConsumptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialConsumptionPayload>
          }
          createMany: {
            args: Prisma.MaterialConsumptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MaterialConsumptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialConsumptionPayload>[]
          }
          delete: {
            args: Prisma.MaterialConsumptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialConsumptionPayload>
          }
          update: {
            args: Prisma.MaterialConsumptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialConsumptionPayload>
          }
          deleteMany: {
            args: Prisma.MaterialConsumptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MaterialConsumptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MaterialConsumptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialConsumptionPayload>[]
          }
          upsert: {
            args: Prisma.MaterialConsumptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialConsumptionPayload>
          }
          aggregate: {
            args: Prisma.MaterialConsumptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMaterialConsumption>
          }
          groupBy: {
            args: Prisma.MaterialConsumptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<MaterialConsumptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.MaterialConsumptionCountArgs<ExtArgs>
            result: $Utils.Optional<MaterialConsumptionCountAggregateOutputType> | number
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
    part?: PartOmit
    bOMComponent?: BOMComponentOmit
    orderLineItem?: OrderLineItemOmit
    fileAttachment?: FileAttachmentOmit
    batch?: BatchOmit
    materialConsumption?: MaterialConsumptionOmit
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
   * Count Type PartCountOutputType
   */

  export type PartCountOutputType = {
    parentBOMs: number
    childBOMs: number
    orderLineItems: number
    materialConsumptions: number
  }

  export type PartCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parentBOMs?: boolean | PartCountOutputTypeCountParentBOMsArgs
    childBOMs?: boolean | PartCountOutputTypeCountChildBOMsArgs
    orderLineItems?: boolean | PartCountOutputTypeCountOrderLineItemsArgs
    materialConsumptions?: boolean | PartCountOutputTypeCountMaterialConsumptionsArgs
  }

  // Custom InputTypes
  /**
   * PartCountOutputType without action
   */
  export type PartCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartCountOutputType
     */
    select?: PartCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PartCountOutputType without action
   */
  export type PartCountOutputTypeCountParentBOMsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BOMComponentWhereInput
  }

  /**
   * PartCountOutputType without action
   */
  export type PartCountOutputTypeCountChildBOMsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BOMComponentWhereInput
  }

  /**
   * PartCountOutputType without action
   */
  export type PartCountOutputTypeCountOrderLineItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderLineItemWhereInput
  }

  /**
   * PartCountOutputType without action
   */
  export type PartCountOutputTypeCountMaterialConsumptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaterialConsumptionWhereInput
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
    materialConsumption: number
  }

  export type BatchCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    routingSteps?: boolean | BatchCountOutputTypeCountRoutingStepsArgs
    qcRecords?: boolean | BatchCountOutputTypeCountQcRecordsArgs
    materialConsumption?: boolean | BatchCountOutputTypeCountMaterialConsumptionArgs
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
   * BatchCountOutputType without action
   */
  export type BatchCountOutputTypeCountMaterialConsumptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaterialConsumptionWhereInput
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
   * Model Part
   */

  export type AggregatePart = {
    _count: PartCountAggregateOutputType | null
    _avg: PartAvgAggregateOutputType | null
    _sum: PartSumAggregateOutputType | null
    _min: PartMinAggregateOutputType | null
    _max: PartMaxAggregateOutputType | null
  }

  export type PartAvgAggregateOutputType = {
    standardCost: Decimal | null
    leadTime: number | null
  }

  export type PartSumAggregateOutputType = {
    standardCost: Decimal | null
    leadTime: number | null
  }

  export type PartMinAggregateOutputType = {
    id: string | null
    partNumber: string | null
    partName: string | null
    partType: $Enums.PartType | null
    drawingNumber: string | null
    revisionLevel: string | null
    description: string | null
    materialSpec: string | null
    unitOfMeasure: string | null
    standardCost: Decimal | null
    leadTime: number | null
    active: boolean | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PartMaxAggregateOutputType = {
    id: string | null
    partNumber: string | null
    partName: string | null
    partType: $Enums.PartType | null
    drawingNumber: string | null
    revisionLevel: string | null
    description: string | null
    materialSpec: string | null
    unitOfMeasure: string | null
    standardCost: Decimal | null
    leadTime: number | null
    active: boolean | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PartCountAggregateOutputType = {
    id: number
    partNumber: number
    partName: number
    partType: number
    drawingNumber: number
    revisionLevel: number
    description: number
    materialSpec: number
    unitOfMeasure: number
    standardCost: number
    leadTime: number
    active: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PartAvgAggregateInputType = {
    standardCost?: true
    leadTime?: true
  }

  export type PartSumAggregateInputType = {
    standardCost?: true
    leadTime?: true
  }

  export type PartMinAggregateInputType = {
    id?: true
    partNumber?: true
    partName?: true
    partType?: true
    drawingNumber?: true
    revisionLevel?: true
    description?: true
    materialSpec?: true
    unitOfMeasure?: true
    standardCost?: true
    leadTime?: true
    active?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PartMaxAggregateInputType = {
    id?: true
    partNumber?: true
    partName?: true
    partType?: true
    drawingNumber?: true
    revisionLevel?: true
    description?: true
    materialSpec?: true
    unitOfMeasure?: true
    standardCost?: true
    leadTime?: true
    active?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PartCountAggregateInputType = {
    id?: true
    partNumber?: true
    partName?: true
    partType?: true
    drawingNumber?: true
    revisionLevel?: true
    description?: true
    materialSpec?: true
    unitOfMeasure?: true
    standardCost?: true
    leadTime?: true
    active?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PartAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Part to aggregate.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Parts
    **/
    _count?: true | PartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PartAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PartSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PartMaxAggregateInputType
  }

  export type GetPartAggregateType<T extends PartAggregateArgs> = {
        [P in keyof T & keyof AggregatePart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePart[P]>
      : GetScalarType<T[P], AggregatePart[P]>
  }




  export type PartGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartWhereInput
    orderBy?: PartOrderByWithAggregationInput | PartOrderByWithAggregationInput[]
    by: PartScalarFieldEnum[] | PartScalarFieldEnum
    having?: PartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PartCountAggregateInputType | true
    _avg?: PartAvgAggregateInputType
    _sum?: PartSumAggregateInputType
    _min?: PartMinAggregateInputType
    _max?: PartMaxAggregateInputType
  }

  export type PartGroupByOutputType = {
    id: string
    partNumber: string
    partName: string
    partType: $Enums.PartType
    drawingNumber: string | null
    revisionLevel: string | null
    description: string | null
    materialSpec: string | null
    unitOfMeasure: string | null
    standardCost: Decimal | null
    leadTime: number | null
    active: boolean
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: PartCountAggregateOutputType | null
    _avg: PartAvgAggregateOutputType | null
    _sum: PartSumAggregateOutputType | null
    _min: PartMinAggregateOutputType | null
    _max: PartMaxAggregateOutputType | null
  }

  type GetPartGroupByPayload<T extends PartGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PartGroupByOutputType[P]>
            : GetScalarType<T[P], PartGroupByOutputType[P]>
        }
      >
    >


  export type PartSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    partNumber?: boolean
    partName?: boolean
    partType?: boolean
    drawingNumber?: boolean
    revisionLevel?: boolean
    description?: boolean
    materialSpec?: boolean
    unitOfMeasure?: boolean
    standardCost?: boolean
    leadTime?: boolean
    active?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parentBOMs?: boolean | Part$parentBOMsArgs<ExtArgs>
    childBOMs?: boolean | Part$childBOMsArgs<ExtArgs>
    orderLineItems?: boolean | Part$orderLineItemsArgs<ExtArgs>
    materialConsumptions?: boolean | Part$materialConsumptionsArgs<ExtArgs>
    _count?: boolean | PartCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["part"]>

  export type PartSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    partNumber?: boolean
    partName?: boolean
    partType?: boolean
    drawingNumber?: boolean
    revisionLevel?: boolean
    description?: boolean
    materialSpec?: boolean
    unitOfMeasure?: boolean
    standardCost?: boolean
    leadTime?: boolean
    active?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["part"]>

  export type PartSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    partNumber?: boolean
    partName?: boolean
    partType?: boolean
    drawingNumber?: boolean
    revisionLevel?: boolean
    description?: boolean
    materialSpec?: boolean
    unitOfMeasure?: boolean
    standardCost?: boolean
    leadTime?: boolean
    active?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["part"]>

  export type PartSelectScalar = {
    id?: boolean
    partNumber?: boolean
    partName?: boolean
    partType?: boolean
    drawingNumber?: boolean
    revisionLevel?: boolean
    description?: boolean
    materialSpec?: boolean
    unitOfMeasure?: boolean
    standardCost?: boolean
    leadTime?: boolean
    active?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PartOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "partNumber" | "partName" | "partType" | "drawingNumber" | "revisionLevel" | "description" | "materialSpec" | "unitOfMeasure" | "standardCost" | "leadTime" | "active" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["part"]>
  export type PartInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parentBOMs?: boolean | Part$parentBOMsArgs<ExtArgs>
    childBOMs?: boolean | Part$childBOMsArgs<ExtArgs>
    orderLineItems?: boolean | Part$orderLineItemsArgs<ExtArgs>
    materialConsumptions?: boolean | Part$materialConsumptionsArgs<ExtArgs>
    _count?: boolean | PartCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PartIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PartIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PartPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Part"
    objects: {
      parentBOMs: Prisma.$BOMComponentPayload<ExtArgs>[]
      childBOMs: Prisma.$BOMComponentPayload<ExtArgs>[]
      orderLineItems: Prisma.$OrderLineItemPayload<ExtArgs>[]
      materialConsumptions: Prisma.$MaterialConsumptionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      partNumber: string
      partName: string
      partType: $Enums.PartType
      drawingNumber: string | null
      revisionLevel: string | null
      description: string | null
      materialSpec: string | null
      unitOfMeasure: string | null
      standardCost: Prisma.Decimal | null
      leadTime: number | null
      active: boolean
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["part"]>
    composites: {}
  }

  type PartGetPayload<S extends boolean | null | undefined | PartDefaultArgs> = $Result.GetResult<Prisma.$PartPayload, S>

  type PartCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PartFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PartCountAggregateInputType | true
    }

  export interface PartDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Part'], meta: { name: 'Part' } }
    /**
     * Find zero or one Part that matches the filter.
     * @param {PartFindUniqueArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PartFindUniqueArgs>(args: SelectSubset<T, PartFindUniqueArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Part that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PartFindUniqueOrThrowArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PartFindUniqueOrThrowArgs>(args: SelectSubset<T, PartFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Part that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartFindFirstArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PartFindFirstArgs>(args?: SelectSubset<T, PartFindFirstArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Part that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartFindFirstOrThrowArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PartFindFirstOrThrowArgs>(args?: SelectSubset<T, PartFindFirstOrThrowArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Parts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Parts
     * const parts = await prisma.part.findMany()
     * 
     * // Get first 10 Parts
     * const parts = await prisma.part.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const partWithIdOnly = await prisma.part.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PartFindManyArgs>(args?: SelectSubset<T, PartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Part.
     * @param {PartCreateArgs} args - Arguments to create a Part.
     * @example
     * // Create one Part
     * const Part = await prisma.part.create({
     *   data: {
     *     // ... data to create a Part
     *   }
     * })
     * 
     */
    create<T extends PartCreateArgs>(args: SelectSubset<T, PartCreateArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Parts.
     * @param {PartCreateManyArgs} args - Arguments to create many Parts.
     * @example
     * // Create many Parts
     * const part = await prisma.part.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PartCreateManyArgs>(args?: SelectSubset<T, PartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Parts and returns the data saved in the database.
     * @param {PartCreateManyAndReturnArgs} args - Arguments to create many Parts.
     * @example
     * // Create many Parts
     * const part = await prisma.part.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Parts and only return the `id`
     * const partWithIdOnly = await prisma.part.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PartCreateManyAndReturnArgs>(args?: SelectSubset<T, PartCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Part.
     * @param {PartDeleteArgs} args - Arguments to delete one Part.
     * @example
     * // Delete one Part
     * const Part = await prisma.part.delete({
     *   where: {
     *     // ... filter to delete one Part
     *   }
     * })
     * 
     */
    delete<T extends PartDeleteArgs>(args: SelectSubset<T, PartDeleteArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Part.
     * @param {PartUpdateArgs} args - Arguments to update one Part.
     * @example
     * // Update one Part
     * const part = await prisma.part.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PartUpdateArgs>(args: SelectSubset<T, PartUpdateArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Parts.
     * @param {PartDeleteManyArgs} args - Arguments to filter Parts to delete.
     * @example
     * // Delete a few Parts
     * const { count } = await prisma.part.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PartDeleteManyArgs>(args?: SelectSubset<T, PartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Parts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Parts
     * const part = await prisma.part.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PartUpdateManyArgs>(args: SelectSubset<T, PartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Parts and returns the data updated in the database.
     * @param {PartUpdateManyAndReturnArgs} args - Arguments to update many Parts.
     * @example
     * // Update many Parts
     * const part = await prisma.part.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Parts and only return the `id`
     * const partWithIdOnly = await prisma.part.updateManyAndReturn({
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
    updateManyAndReturn<T extends PartUpdateManyAndReturnArgs>(args: SelectSubset<T, PartUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Part.
     * @param {PartUpsertArgs} args - Arguments to update or create a Part.
     * @example
     * // Update or create a Part
     * const part = await prisma.part.upsert({
     *   create: {
     *     // ... data to create a Part
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Part we want to update
     *   }
     * })
     */
    upsert<T extends PartUpsertArgs>(args: SelectSubset<T, PartUpsertArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Parts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartCountArgs} args - Arguments to filter Parts to count.
     * @example
     * // Count the number of Parts
     * const count = await prisma.part.count({
     *   where: {
     *     // ... the filter for the Parts we want to count
     *   }
     * })
    **/
    count<T extends PartCountArgs>(
      args?: Subset<T, PartCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Part.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PartAggregateArgs>(args: Subset<T, PartAggregateArgs>): Prisma.PrismaPromise<GetPartAggregateType<T>>

    /**
     * Group by Part.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartGroupByArgs} args - Group by arguments.
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
      T extends PartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PartGroupByArgs['orderBy'] }
        : { orderBy?: PartGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Part model
   */
  readonly fields: PartFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Part.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PartClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parentBOMs<T extends Part$parentBOMsArgs<ExtArgs> = {}>(args?: Subset<T, Part$parentBOMsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BOMComponentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    childBOMs<T extends Part$childBOMsArgs<ExtArgs> = {}>(args?: Subset<T, Part$childBOMsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BOMComponentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orderLineItems<T extends Part$orderLineItemsArgs<ExtArgs> = {}>(args?: Subset<T, Part$orderLineItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderLineItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    materialConsumptions<T extends Part$materialConsumptionsArgs<ExtArgs> = {}>(args?: Subset<T, Part$materialConsumptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialConsumptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Part model
   */
  interface PartFieldRefs {
    readonly id: FieldRef<"Part", 'String'>
    readonly partNumber: FieldRef<"Part", 'String'>
    readonly partName: FieldRef<"Part", 'String'>
    readonly partType: FieldRef<"Part", 'PartType'>
    readonly drawingNumber: FieldRef<"Part", 'String'>
    readonly revisionLevel: FieldRef<"Part", 'String'>
    readonly description: FieldRef<"Part", 'String'>
    readonly materialSpec: FieldRef<"Part", 'String'>
    readonly unitOfMeasure: FieldRef<"Part", 'String'>
    readonly standardCost: FieldRef<"Part", 'Decimal'>
    readonly leadTime: FieldRef<"Part", 'Int'>
    readonly active: FieldRef<"Part", 'Boolean'>
    readonly notes: FieldRef<"Part", 'String'>
    readonly createdAt: FieldRef<"Part", 'DateTime'>
    readonly updatedAt: FieldRef<"Part", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Part findUnique
   */
  export type PartFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where: PartWhereUniqueInput
  }

  /**
   * Part findUniqueOrThrow
   */
  export type PartFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where: PartWhereUniqueInput
  }

  /**
   * Part findFirst
   */
  export type PartFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parts.
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parts.
     */
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }

  /**
   * Part findFirstOrThrow
   */
  export type PartFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parts.
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parts.
     */
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }

  /**
   * Part findMany
   */
  export type PartFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Parts to fetch.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Parts.
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }

  /**
   * Part create
   */
  export type PartCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * The data needed to create a Part.
     */
    data: XOR<PartCreateInput, PartUncheckedCreateInput>
  }

  /**
   * Part createMany
   */
  export type PartCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Parts.
     */
    data: PartCreateManyInput | PartCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Part createManyAndReturn
   */
  export type PartCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * The data used to create many Parts.
     */
    data: PartCreateManyInput | PartCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Part update
   */
  export type PartUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * The data needed to update a Part.
     */
    data: XOR<PartUpdateInput, PartUncheckedUpdateInput>
    /**
     * Choose, which Part to update.
     */
    where: PartWhereUniqueInput
  }

  /**
   * Part updateMany
   */
  export type PartUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Parts.
     */
    data: XOR<PartUpdateManyMutationInput, PartUncheckedUpdateManyInput>
    /**
     * Filter which Parts to update
     */
    where?: PartWhereInput
    /**
     * Limit how many Parts to update.
     */
    limit?: number
  }

  /**
   * Part updateManyAndReturn
   */
  export type PartUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * The data used to update Parts.
     */
    data: XOR<PartUpdateManyMutationInput, PartUncheckedUpdateManyInput>
    /**
     * Filter which Parts to update
     */
    where?: PartWhereInput
    /**
     * Limit how many Parts to update.
     */
    limit?: number
  }

  /**
   * Part upsert
   */
  export type PartUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * The filter to search for the Part to update in case it exists.
     */
    where: PartWhereUniqueInput
    /**
     * In case the Part found by the `where` argument doesn't exist, create a new Part with this data.
     */
    create: XOR<PartCreateInput, PartUncheckedCreateInput>
    /**
     * In case the Part was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PartUpdateInput, PartUncheckedUpdateInput>
  }

  /**
   * Part delete
   */
  export type PartDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter which Part to delete.
     */
    where: PartWhereUniqueInput
  }

  /**
   * Part deleteMany
   */
  export type PartDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Parts to delete
     */
    where?: PartWhereInput
    /**
     * Limit how many Parts to delete.
     */
    limit?: number
  }

  /**
   * Part.parentBOMs
   */
  export type Part$parentBOMsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BOMComponent
     */
    select?: BOMComponentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BOMComponent
     */
    omit?: BOMComponentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BOMComponentInclude<ExtArgs> | null
    where?: BOMComponentWhereInput
    orderBy?: BOMComponentOrderByWithRelationInput | BOMComponentOrderByWithRelationInput[]
    cursor?: BOMComponentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BOMComponentScalarFieldEnum | BOMComponentScalarFieldEnum[]
  }

  /**
   * Part.childBOMs
   */
  export type Part$childBOMsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BOMComponent
     */
    select?: BOMComponentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BOMComponent
     */
    omit?: BOMComponentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BOMComponentInclude<ExtArgs> | null
    where?: BOMComponentWhereInput
    orderBy?: BOMComponentOrderByWithRelationInput | BOMComponentOrderByWithRelationInput[]
    cursor?: BOMComponentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BOMComponentScalarFieldEnum | BOMComponentScalarFieldEnum[]
  }

  /**
   * Part.orderLineItems
   */
  export type Part$orderLineItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Part.materialConsumptions
   */
  export type Part$materialConsumptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialConsumption
     */
    select?: MaterialConsumptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialConsumption
     */
    omit?: MaterialConsumptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialConsumptionInclude<ExtArgs> | null
    where?: MaterialConsumptionWhereInput
    orderBy?: MaterialConsumptionOrderByWithRelationInput | MaterialConsumptionOrderByWithRelationInput[]
    cursor?: MaterialConsumptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MaterialConsumptionScalarFieldEnum | MaterialConsumptionScalarFieldEnum[]
  }

  /**
   * Part without action
   */
  export type PartDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
  }


  /**
   * Model BOMComponent
   */

  export type AggregateBOMComponent = {
    _count: BOMComponentCountAggregateOutputType | null
    _avg: BOMComponentAvgAggregateOutputType | null
    _sum: BOMComponentSumAggregateOutputType | null
    _min: BOMComponentMinAggregateOutputType | null
    _max: BOMComponentMaxAggregateOutputType | null
  }

  export type BOMComponentAvgAggregateOutputType = {
    quantity: Decimal | null
    scrapFactor: Decimal | null
  }

  export type BOMComponentSumAggregateOutputType = {
    quantity: Decimal | null
    scrapFactor: Decimal | null
  }

  export type BOMComponentMinAggregateOutputType = {
    id: string | null
    parentPartId: string | null
    childPartId: string | null
    quantity: Decimal | null
    unitOfMeasure: string | null
    scrapFactor: Decimal | null
    operation: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BOMComponentMaxAggregateOutputType = {
    id: string | null
    parentPartId: string | null
    childPartId: string | null
    quantity: Decimal | null
    unitOfMeasure: string | null
    scrapFactor: Decimal | null
    operation: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BOMComponentCountAggregateOutputType = {
    id: number
    parentPartId: number
    childPartId: number
    quantity: number
    unitOfMeasure: number
    scrapFactor: number
    operation: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BOMComponentAvgAggregateInputType = {
    quantity?: true
    scrapFactor?: true
  }

  export type BOMComponentSumAggregateInputType = {
    quantity?: true
    scrapFactor?: true
  }

  export type BOMComponentMinAggregateInputType = {
    id?: true
    parentPartId?: true
    childPartId?: true
    quantity?: true
    unitOfMeasure?: true
    scrapFactor?: true
    operation?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BOMComponentMaxAggregateInputType = {
    id?: true
    parentPartId?: true
    childPartId?: true
    quantity?: true
    unitOfMeasure?: true
    scrapFactor?: true
    operation?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BOMComponentCountAggregateInputType = {
    id?: true
    parentPartId?: true
    childPartId?: true
    quantity?: true
    unitOfMeasure?: true
    scrapFactor?: true
    operation?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BOMComponentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BOMComponent to aggregate.
     */
    where?: BOMComponentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BOMComponents to fetch.
     */
    orderBy?: BOMComponentOrderByWithRelationInput | BOMComponentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BOMComponentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BOMComponents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BOMComponents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BOMComponents
    **/
    _count?: true | BOMComponentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BOMComponentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BOMComponentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BOMComponentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BOMComponentMaxAggregateInputType
  }

  export type GetBOMComponentAggregateType<T extends BOMComponentAggregateArgs> = {
        [P in keyof T & keyof AggregateBOMComponent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBOMComponent[P]>
      : GetScalarType<T[P], AggregateBOMComponent[P]>
  }




  export type BOMComponentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BOMComponentWhereInput
    orderBy?: BOMComponentOrderByWithAggregationInput | BOMComponentOrderByWithAggregationInput[]
    by: BOMComponentScalarFieldEnum[] | BOMComponentScalarFieldEnum
    having?: BOMComponentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BOMComponentCountAggregateInputType | true
    _avg?: BOMComponentAvgAggregateInputType
    _sum?: BOMComponentSumAggregateInputType
    _min?: BOMComponentMinAggregateInputType
    _max?: BOMComponentMaxAggregateInputType
  }

  export type BOMComponentGroupByOutputType = {
    id: string
    parentPartId: string
    childPartId: string
    quantity: Decimal
    unitOfMeasure: string | null
    scrapFactor: Decimal | null
    operation: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: BOMComponentCountAggregateOutputType | null
    _avg: BOMComponentAvgAggregateOutputType | null
    _sum: BOMComponentSumAggregateOutputType | null
    _min: BOMComponentMinAggregateOutputType | null
    _max: BOMComponentMaxAggregateOutputType | null
  }

  type GetBOMComponentGroupByPayload<T extends BOMComponentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BOMComponentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BOMComponentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BOMComponentGroupByOutputType[P]>
            : GetScalarType<T[P], BOMComponentGroupByOutputType[P]>
        }
      >
    >


  export type BOMComponentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    parentPartId?: boolean
    childPartId?: boolean
    quantity?: boolean
    unitOfMeasure?: boolean
    scrapFactor?: boolean
    operation?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parentPart?: boolean | PartDefaultArgs<ExtArgs>
    childPart?: boolean | PartDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bOMComponent"]>

  export type BOMComponentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    parentPartId?: boolean
    childPartId?: boolean
    quantity?: boolean
    unitOfMeasure?: boolean
    scrapFactor?: boolean
    operation?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parentPart?: boolean | PartDefaultArgs<ExtArgs>
    childPart?: boolean | PartDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bOMComponent"]>

  export type BOMComponentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    parentPartId?: boolean
    childPartId?: boolean
    quantity?: boolean
    unitOfMeasure?: boolean
    scrapFactor?: boolean
    operation?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parentPart?: boolean | PartDefaultArgs<ExtArgs>
    childPart?: boolean | PartDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bOMComponent"]>

  export type BOMComponentSelectScalar = {
    id?: boolean
    parentPartId?: boolean
    childPartId?: boolean
    quantity?: boolean
    unitOfMeasure?: boolean
    scrapFactor?: boolean
    operation?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BOMComponentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "parentPartId" | "childPartId" | "quantity" | "unitOfMeasure" | "scrapFactor" | "operation" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["bOMComponent"]>
  export type BOMComponentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parentPart?: boolean | PartDefaultArgs<ExtArgs>
    childPart?: boolean | PartDefaultArgs<ExtArgs>
  }
  export type BOMComponentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parentPart?: boolean | PartDefaultArgs<ExtArgs>
    childPart?: boolean | PartDefaultArgs<ExtArgs>
  }
  export type BOMComponentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parentPart?: boolean | PartDefaultArgs<ExtArgs>
    childPart?: boolean | PartDefaultArgs<ExtArgs>
  }

  export type $BOMComponentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BOMComponent"
    objects: {
      parentPart: Prisma.$PartPayload<ExtArgs>
      childPart: Prisma.$PartPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      parentPartId: string
      childPartId: string
      quantity: Prisma.Decimal
      unitOfMeasure: string | null
      scrapFactor: Prisma.Decimal | null
      operation: string | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["bOMComponent"]>
    composites: {}
  }

  type BOMComponentGetPayload<S extends boolean | null | undefined | BOMComponentDefaultArgs> = $Result.GetResult<Prisma.$BOMComponentPayload, S>

  type BOMComponentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BOMComponentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BOMComponentCountAggregateInputType | true
    }

  export interface BOMComponentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BOMComponent'], meta: { name: 'BOMComponent' } }
    /**
     * Find zero or one BOMComponent that matches the filter.
     * @param {BOMComponentFindUniqueArgs} args - Arguments to find a BOMComponent
     * @example
     * // Get one BOMComponent
     * const bOMComponent = await prisma.bOMComponent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BOMComponentFindUniqueArgs>(args: SelectSubset<T, BOMComponentFindUniqueArgs<ExtArgs>>): Prisma__BOMComponentClient<$Result.GetResult<Prisma.$BOMComponentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BOMComponent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BOMComponentFindUniqueOrThrowArgs} args - Arguments to find a BOMComponent
     * @example
     * // Get one BOMComponent
     * const bOMComponent = await prisma.bOMComponent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BOMComponentFindUniqueOrThrowArgs>(args: SelectSubset<T, BOMComponentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BOMComponentClient<$Result.GetResult<Prisma.$BOMComponentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BOMComponent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BOMComponentFindFirstArgs} args - Arguments to find a BOMComponent
     * @example
     * // Get one BOMComponent
     * const bOMComponent = await prisma.bOMComponent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BOMComponentFindFirstArgs>(args?: SelectSubset<T, BOMComponentFindFirstArgs<ExtArgs>>): Prisma__BOMComponentClient<$Result.GetResult<Prisma.$BOMComponentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BOMComponent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BOMComponentFindFirstOrThrowArgs} args - Arguments to find a BOMComponent
     * @example
     * // Get one BOMComponent
     * const bOMComponent = await prisma.bOMComponent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BOMComponentFindFirstOrThrowArgs>(args?: SelectSubset<T, BOMComponentFindFirstOrThrowArgs<ExtArgs>>): Prisma__BOMComponentClient<$Result.GetResult<Prisma.$BOMComponentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BOMComponents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BOMComponentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BOMComponents
     * const bOMComponents = await prisma.bOMComponent.findMany()
     * 
     * // Get first 10 BOMComponents
     * const bOMComponents = await prisma.bOMComponent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bOMComponentWithIdOnly = await prisma.bOMComponent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BOMComponentFindManyArgs>(args?: SelectSubset<T, BOMComponentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BOMComponentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BOMComponent.
     * @param {BOMComponentCreateArgs} args - Arguments to create a BOMComponent.
     * @example
     * // Create one BOMComponent
     * const BOMComponent = await prisma.bOMComponent.create({
     *   data: {
     *     // ... data to create a BOMComponent
     *   }
     * })
     * 
     */
    create<T extends BOMComponentCreateArgs>(args: SelectSubset<T, BOMComponentCreateArgs<ExtArgs>>): Prisma__BOMComponentClient<$Result.GetResult<Prisma.$BOMComponentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BOMComponents.
     * @param {BOMComponentCreateManyArgs} args - Arguments to create many BOMComponents.
     * @example
     * // Create many BOMComponents
     * const bOMComponent = await prisma.bOMComponent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BOMComponentCreateManyArgs>(args?: SelectSubset<T, BOMComponentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BOMComponents and returns the data saved in the database.
     * @param {BOMComponentCreateManyAndReturnArgs} args - Arguments to create many BOMComponents.
     * @example
     * // Create many BOMComponents
     * const bOMComponent = await prisma.bOMComponent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BOMComponents and only return the `id`
     * const bOMComponentWithIdOnly = await prisma.bOMComponent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BOMComponentCreateManyAndReturnArgs>(args?: SelectSubset<T, BOMComponentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BOMComponentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BOMComponent.
     * @param {BOMComponentDeleteArgs} args - Arguments to delete one BOMComponent.
     * @example
     * // Delete one BOMComponent
     * const BOMComponent = await prisma.bOMComponent.delete({
     *   where: {
     *     // ... filter to delete one BOMComponent
     *   }
     * })
     * 
     */
    delete<T extends BOMComponentDeleteArgs>(args: SelectSubset<T, BOMComponentDeleteArgs<ExtArgs>>): Prisma__BOMComponentClient<$Result.GetResult<Prisma.$BOMComponentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BOMComponent.
     * @param {BOMComponentUpdateArgs} args - Arguments to update one BOMComponent.
     * @example
     * // Update one BOMComponent
     * const bOMComponent = await prisma.bOMComponent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BOMComponentUpdateArgs>(args: SelectSubset<T, BOMComponentUpdateArgs<ExtArgs>>): Prisma__BOMComponentClient<$Result.GetResult<Prisma.$BOMComponentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BOMComponents.
     * @param {BOMComponentDeleteManyArgs} args - Arguments to filter BOMComponents to delete.
     * @example
     * // Delete a few BOMComponents
     * const { count } = await prisma.bOMComponent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BOMComponentDeleteManyArgs>(args?: SelectSubset<T, BOMComponentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BOMComponents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BOMComponentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BOMComponents
     * const bOMComponent = await prisma.bOMComponent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BOMComponentUpdateManyArgs>(args: SelectSubset<T, BOMComponentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BOMComponents and returns the data updated in the database.
     * @param {BOMComponentUpdateManyAndReturnArgs} args - Arguments to update many BOMComponents.
     * @example
     * // Update many BOMComponents
     * const bOMComponent = await prisma.bOMComponent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BOMComponents and only return the `id`
     * const bOMComponentWithIdOnly = await prisma.bOMComponent.updateManyAndReturn({
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
    updateManyAndReturn<T extends BOMComponentUpdateManyAndReturnArgs>(args: SelectSubset<T, BOMComponentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BOMComponentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BOMComponent.
     * @param {BOMComponentUpsertArgs} args - Arguments to update or create a BOMComponent.
     * @example
     * // Update or create a BOMComponent
     * const bOMComponent = await prisma.bOMComponent.upsert({
     *   create: {
     *     // ... data to create a BOMComponent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BOMComponent we want to update
     *   }
     * })
     */
    upsert<T extends BOMComponentUpsertArgs>(args: SelectSubset<T, BOMComponentUpsertArgs<ExtArgs>>): Prisma__BOMComponentClient<$Result.GetResult<Prisma.$BOMComponentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BOMComponents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BOMComponentCountArgs} args - Arguments to filter BOMComponents to count.
     * @example
     * // Count the number of BOMComponents
     * const count = await prisma.bOMComponent.count({
     *   where: {
     *     // ... the filter for the BOMComponents we want to count
     *   }
     * })
    **/
    count<T extends BOMComponentCountArgs>(
      args?: Subset<T, BOMComponentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BOMComponentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BOMComponent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BOMComponentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BOMComponentAggregateArgs>(args: Subset<T, BOMComponentAggregateArgs>): Prisma.PrismaPromise<GetBOMComponentAggregateType<T>>

    /**
     * Group by BOMComponent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BOMComponentGroupByArgs} args - Group by arguments.
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
      T extends BOMComponentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BOMComponentGroupByArgs['orderBy'] }
        : { orderBy?: BOMComponentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BOMComponentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBOMComponentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BOMComponent model
   */
  readonly fields: BOMComponentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BOMComponent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BOMComponentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parentPart<T extends PartDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PartDefaultArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    childPart<T extends PartDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PartDefaultArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the BOMComponent model
   */
  interface BOMComponentFieldRefs {
    readonly id: FieldRef<"BOMComponent", 'String'>
    readonly parentPartId: FieldRef<"BOMComponent", 'String'>
    readonly childPartId: FieldRef<"BOMComponent", 'String'>
    readonly quantity: FieldRef<"BOMComponent", 'Decimal'>
    readonly unitOfMeasure: FieldRef<"BOMComponent", 'String'>
    readonly scrapFactor: FieldRef<"BOMComponent", 'Decimal'>
    readonly operation: FieldRef<"BOMComponent", 'String'>
    readonly notes: FieldRef<"BOMComponent", 'String'>
    readonly createdAt: FieldRef<"BOMComponent", 'DateTime'>
    readonly updatedAt: FieldRef<"BOMComponent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BOMComponent findUnique
   */
  export type BOMComponentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BOMComponent
     */
    select?: BOMComponentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BOMComponent
     */
    omit?: BOMComponentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BOMComponentInclude<ExtArgs> | null
    /**
     * Filter, which BOMComponent to fetch.
     */
    where: BOMComponentWhereUniqueInput
  }

  /**
   * BOMComponent findUniqueOrThrow
   */
  export type BOMComponentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BOMComponent
     */
    select?: BOMComponentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BOMComponent
     */
    omit?: BOMComponentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BOMComponentInclude<ExtArgs> | null
    /**
     * Filter, which BOMComponent to fetch.
     */
    where: BOMComponentWhereUniqueInput
  }

  /**
   * BOMComponent findFirst
   */
  export type BOMComponentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BOMComponent
     */
    select?: BOMComponentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BOMComponent
     */
    omit?: BOMComponentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BOMComponentInclude<ExtArgs> | null
    /**
     * Filter, which BOMComponent to fetch.
     */
    where?: BOMComponentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BOMComponents to fetch.
     */
    orderBy?: BOMComponentOrderByWithRelationInput | BOMComponentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BOMComponents.
     */
    cursor?: BOMComponentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BOMComponents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BOMComponents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BOMComponents.
     */
    distinct?: BOMComponentScalarFieldEnum | BOMComponentScalarFieldEnum[]
  }

  /**
   * BOMComponent findFirstOrThrow
   */
  export type BOMComponentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BOMComponent
     */
    select?: BOMComponentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BOMComponent
     */
    omit?: BOMComponentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BOMComponentInclude<ExtArgs> | null
    /**
     * Filter, which BOMComponent to fetch.
     */
    where?: BOMComponentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BOMComponents to fetch.
     */
    orderBy?: BOMComponentOrderByWithRelationInput | BOMComponentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BOMComponents.
     */
    cursor?: BOMComponentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BOMComponents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BOMComponents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BOMComponents.
     */
    distinct?: BOMComponentScalarFieldEnum | BOMComponentScalarFieldEnum[]
  }

  /**
   * BOMComponent findMany
   */
  export type BOMComponentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BOMComponent
     */
    select?: BOMComponentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BOMComponent
     */
    omit?: BOMComponentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BOMComponentInclude<ExtArgs> | null
    /**
     * Filter, which BOMComponents to fetch.
     */
    where?: BOMComponentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BOMComponents to fetch.
     */
    orderBy?: BOMComponentOrderByWithRelationInput | BOMComponentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BOMComponents.
     */
    cursor?: BOMComponentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BOMComponents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BOMComponents.
     */
    skip?: number
    distinct?: BOMComponentScalarFieldEnum | BOMComponentScalarFieldEnum[]
  }

  /**
   * BOMComponent create
   */
  export type BOMComponentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BOMComponent
     */
    select?: BOMComponentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BOMComponent
     */
    omit?: BOMComponentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BOMComponentInclude<ExtArgs> | null
    /**
     * The data needed to create a BOMComponent.
     */
    data: XOR<BOMComponentCreateInput, BOMComponentUncheckedCreateInput>
  }

  /**
   * BOMComponent createMany
   */
  export type BOMComponentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BOMComponents.
     */
    data: BOMComponentCreateManyInput | BOMComponentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BOMComponent createManyAndReturn
   */
  export type BOMComponentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BOMComponent
     */
    select?: BOMComponentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BOMComponent
     */
    omit?: BOMComponentOmit<ExtArgs> | null
    /**
     * The data used to create many BOMComponents.
     */
    data: BOMComponentCreateManyInput | BOMComponentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BOMComponentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BOMComponent update
   */
  export type BOMComponentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BOMComponent
     */
    select?: BOMComponentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BOMComponent
     */
    omit?: BOMComponentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BOMComponentInclude<ExtArgs> | null
    /**
     * The data needed to update a BOMComponent.
     */
    data: XOR<BOMComponentUpdateInput, BOMComponentUncheckedUpdateInput>
    /**
     * Choose, which BOMComponent to update.
     */
    where: BOMComponentWhereUniqueInput
  }

  /**
   * BOMComponent updateMany
   */
  export type BOMComponentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BOMComponents.
     */
    data: XOR<BOMComponentUpdateManyMutationInput, BOMComponentUncheckedUpdateManyInput>
    /**
     * Filter which BOMComponents to update
     */
    where?: BOMComponentWhereInput
    /**
     * Limit how many BOMComponents to update.
     */
    limit?: number
  }

  /**
   * BOMComponent updateManyAndReturn
   */
  export type BOMComponentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BOMComponent
     */
    select?: BOMComponentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BOMComponent
     */
    omit?: BOMComponentOmit<ExtArgs> | null
    /**
     * The data used to update BOMComponents.
     */
    data: XOR<BOMComponentUpdateManyMutationInput, BOMComponentUncheckedUpdateManyInput>
    /**
     * Filter which BOMComponents to update
     */
    where?: BOMComponentWhereInput
    /**
     * Limit how many BOMComponents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BOMComponentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BOMComponent upsert
   */
  export type BOMComponentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BOMComponent
     */
    select?: BOMComponentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BOMComponent
     */
    omit?: BOMComponentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BOMComponentInclude<ExtArgs> | null
    /**
     * The filter to search for the BOMComponent to update in case it exists.
     */
    where: BOMComponentWhereUniqueInput
    /**
     * In case the BOMComponent found by the `where` argument doesn't exist, create a new BOMComponent with this data.
     */
    create: XOR<BOMComponentCreateInput, BOMComponentUncheckedCreateInput>
    /**
     * In case the BOMComponent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BOMComponentUpdateInput, BOMComponentUncheckedUpdateInput>
  }

  /**
   * BOMComponent delete
   */
  export type BOMComponentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BOMComponent
     */
    select?: BOMComponentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BOMComponent
     */
    omit?: BOMComponentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BOMComponentInclude<ExtArgs> | null
    /**
     * Filter which BOMComponent to delete.
     */
    where: BOMComponentWhereUniqueInput
  }

  /**
   * BOMComponent deleteMany
   */
  export type BOMComponentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BOMComponents to delete
     */
    where?: BOMComponentWhereInput
    /**
     * Limit how many BOMComponents to delete.
     */
    limit?: number
  }

  /**
   * BOMComponent without action
   */
  export type BOMComponentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BOMComponent
     */
    select?: BOMComponentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BOMComponent
     */
    omit?: BOMComponentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BOMComponentInclude<ExtArgs> | null
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
    unitPrice: Decimal | null
  }

  export type OrderLineItemSumAggregateOutputType = {
    quantity: number | null
    unitPrice: Decimal | null
  }

  export type OrderLineItemMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    partId: string | null
    quantity: number | null
    unitPrice: Decimal | null
    dueDate: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderLineItemMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    partId: string | null
    quantity: number | null
    unitPrice: Decimal | null
    dueDate: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderLineItemCountAggregateOutputType = {
    id: number
    orderId: number
    partId: number
    quantity: number
    unitPrice: number
    dueDate: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrderLineItemAvgAggregateInputType = {
    quantity?: true
    unitPrice?: true
  }

  export type OrderLineItemSumAggregateInputType = {
    quantity?: true
    unitPrice?: true
  }

  export type OrderLineItemMinAggregateInputType = {
    id?: true
    orderId?: true
    partId?: true
    quantity?: true
    unitPrice?: true
    dueDate?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderLineItemMaxAggregateInputType = {
    id?: true
    orderId?: true
    partId?: true
    quantity?: true
    unitPrice?: true
    dueDate?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderLineItemCountAggregateInputType = {
    id?: true
    orderId?: true
    partId?: true
    quantity?: true
    unitPrice?: true
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
    partId: string
    quantity: number
    unitPrice: Decimal | null
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
    partId?: boolean
    quantity?: boolean
    unitPrice?: boolean
    dueDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    purchaseOrder?: boolean | PurchaseOrderDefaultArgs<ExtArgs>
    part?: boolean | PartDefaultArgs<ExtArgs>
    fileAttachments?: boolean | OrderLineItem$fileAttachmentsArgs<ExtArgs>
    batches?: boolean | OrderLineItem$batchesArgs<ExtArgs>
    _count?: boolean | OrderLineItemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderLineItem"]>

  export type OrderLineItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    partId?: boolean
    quantity?: boolean
    unitPrice?: boolean
    dueDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    purchaseOrder?: boolean | PurchaseOrderDefaultArgs<ExtArgs>
    part?: boolean | PartDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderLineItem"]>

  export type OrderLineItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    partId?: boolean
    quantity?: boolean
    unitPrice?: boolean
    dueDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    purchaseOrder?: boolean | PurchaseOrderDefaultArgs<ExtArgs>
    part?: boolean | PartDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderLineItem"]>

  export type OrderLineItemSelectScalar = {
    id?: boolean
    orderId?: boolean
    partId?: boolean
    quantity?: boolean
    unitPrice?: boolean
    dueDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrderLineItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "partId" | "quantity" | "unitPrice" | "dueDate" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["orderLineItem"]>
  export type OrderLineItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    purchaseOrder?: boolean | PurchaseOrderDefaultArgs<ExtArgs>
    part?: boolean | PartDefaultArgs<ExtArgs>
    fileAttachments?: boolean | OrderLineItem$fileAttachmentsArgs<ExtArgs>
    batches?: boolean | OrderLineItem$batchesArgs<ExtArgs>
    _count?: boolean | OrderLineItemCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrderLineItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    purchaseOrder?: boolean | PurchaseOrderDefaultArgs<ExtArgs>
    part?: boolean | PartDefaultArgs<ExtArgs>
  }
  export type OrderLineItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    purchaseOrder?: boolean | PurchaseOrderDefaultArgs<ExtArgs>
    part?: boolean | PartDefaultArgs<ExtArgs>
  }

  export type $OrderLineItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderLineItem"
    objects: {
      purchaseOrder: Prisma.$PurchaseOrderPayload<ExtArgs>
      part: Prisma.$PartPayload<ExtArgs>
      fileAttachments: Prisma.$FileAttachmentPayload<ExtArgs>[]
      batches: Prisma.$BatchPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      partId: string
      quantity: number
      unitPrice: Prisma.Decimal | null
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
    part<T extends PartDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PartDefaultArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
    readonly partId: FieldRef<"OrderLineItem", 'String'>
    readonly quantity: FieldRef<"OrderLineItem", 'Int'>
    readonly unitPrice: FieldRef<"OrderLineItem", 'Decimal'>
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
    _avg: FileAttachmentAvgAggregateOutputType | null
    _sum: FileAttachmentSumAggregateOutputType | null
    _min: FileAttachmentMinAggregateOutputType | null
    _max: FileAttachmentMaxAggregateOutputType | null
  }

  export type FileAttachmentAvgAggregateOutputType = {
    fileSize: number | null
  }

  export type FileAttachmentSumAggregateOutputType = {
    fileSize: number | null
  }

  export type FileAttachmentMinAggregateOutputType = {
    id: string | null
    lineItemId: string | null
    fileName: string | null
    storedFileName: string | null
    filePath: string | null
    fileType: string | null
    mimeType: string | null
    fileSize: number | null
    uploadedBy: string | null
    description: string | null
    createdAt: Date | null
  }

  export type FileAttachmentMaxAggregateOutputType = {
    id: string | null
    lineItemId: string | null
    fileName: string | null
    storedFileName: string | null
    filePath: string | null
    fileType: string | null
    mimeType: string | null
    fileSize: number | null
    uploadedBy: string | null
    description: string | null
    createdAt: Date | null
  }

  export type FileAttachmentCountAggregateOutputType = {
    id: number
    lineItemId: number
    fileName: number
    storedFileName: number
    filePath: number
    fileType: number
    mimeType: number
    fileSize: number
    uploadedBy: number
    description: number
    createdAt: number
    _all: number
  }


  export type FileAttachmentAvgAggregateInputType = {
    fileSize?: true
  }

  export type FileAttachmentSumAggregateInputType = {
    fileSize?: true
  }

  export type FileAttachmentMinAggregateInputType = {
    id?: true
    lineItemId?: true
    fileName?: true
    storedFileName?: true
    filePath?: true
    fileType?: true
    mimeType?: true
    fileSize?: true
    uploadedBy?: true
    description?: true
    createdAt?: true
  }

  export type FileAttachmentMaxAggregateInputType = {
    id?: true
    lineItemId?: true
    fileName?: true
    storedFileName?: true
    filePath?: true
    fileType?: true
    mimeType?: true
    fileSize?: true
    uploadedBy?: true
    description?: true
    createdAt?: true
  }

  export type FileAttachmentCountAggregateInputType = {
    id?: true
    lineItemId?: true
    fileName?: true
    storedFileName?: true
    filePath?: true
    fileType?: true
    mimeType?: true
    fileSize?: true
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
     * Select which fields to average
    **/
    _avg?: FileAttachmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FileAttachmentSumAggregateInputType
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
    _avg?: FileAttachmentAvgAggregateInputType
    _sum?: FileAttachmentSumAggregateInputType
    _min?: FileAttachmentMinAggregateInputType
    _max?: FileAttachmentMaxAggregateInputType
  }

  export type FileAttachmentGroupByOutputType = {
    id: string
    lineItemId: string
    fileName: string
    storedFileName: string
    filePath: string
    fileType: string
    mimeType: string
    fileSize: number
    uploadedBy: string
    description: string | null
    createdAt: Date
    _count: FileAttachmentCountAggregateOutputType | null
    _avg: FileAttachmentAvgAggregateOutputType | null
    _sum: FileAttachmentSumAggregateOutputType | null
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
    storedFileName?: boolean
    filePath?: boolean
    fileType?: boolean
    mimeType?: boolean
    fileSize?: boolean
    uploadedBy?: boolean
    description?: boolean
    createdAt?: boolean
    lineItem?: boolean | OrderLineItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fileAttachment"]>

  export type FileAttachmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    lineItemId?: boolean
    fileName?: boolean
    storedFileName?: boolean
    filePath?: boolean
    fileType?: boolean
    mimeType?: boolean
    fileSize?: boolean
    uploadedBy?: boolean
    description?: boolean
    createdAt?: boolean
    lineItem?: boolean | OrderLineItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fileAttachment"]>

  export type FileAttachmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    lineItemId?: boolean
    fileName?: boolean
    storedFileName?: boolean
    filePath?: boolean
    fileType?: boolean
    mimeType?: boolean
    fileSize?: boolean
    uploadedBy?: boolean
    description?: boolean
    createdAt?: boolean
    lineItem?: boolean | OrderLineItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fileAttachment"]>

  export type FileAttachmentSelectScalar = {
    id?: boolean
    lineItemId?: boolean
    fileName?: boolean
    storedFileName?: boolean
    filePath?: boolean
    fileType?: boolean
    mimeType?: boolean
    fileSize?: boolean
    uploadedBy?: boolean
    description?: boolean
    createdAt?: boolean
  }

  export type FileAttachmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "lineItemId" | "fileName" | "storedFileName" | "filePath" | "fileType" | "mimeType" | "fileSize" | "uploadedBy" | "description" | "createdAt", ExtArgs["result"]["fileAttachment"]>
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
      storedFileName: string
      filePath: string
      fileType: string
      mimeType: string
      fileSize: number
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
    readonly storedFileName: FieldRef<"FileAttachment", 'String'>
    readonly filePath: FieldRef<"FileAttachment", 'String'>
    readonly fileType: FieldRef<"FileAttachment", 'String'>
    readonly mimeType: FieldRef<"FileAttachment", 'String'>
    readonly fileSize: FieldRef<"FileAttachment", 'Int'>
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
    materialConsumption?: boolean | Batch$materialConsumptionArgs<ExtArgs>
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
    materialConsumption?: boolean | Batch$materialConsumptionArgs<ExtArgs>
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
      materialConsumption: Prisma.$MaterialConsumptionPayload<ExtArgs>[]
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
    materialConsumption<T extends Batch$materialConsumptionArgs<ExtArgs> = {}>(args?: Subset<T, Batch$materialConsumptionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialConsumptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Batch.materialConsumption
   */
  export type Batch$materialConsumptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialConsumption
     */
    select?: MaterialConsumptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialConsumption
     */
    omit?: MaterialConsumptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialConsumptionInclude<ExtArgs> | null
    where?: MaterialConsumptionWhereInput
    orderBy?: MaterialConsumptionOrderByWithRelationInput | MaterialConsumptionOrderByWithRelationInput[]
    cursor?: MaterialConsumptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MaterialConsumptionScalarFieldEnum | MaterialConsumptionScalarFieldEnum[]
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
   * Model MaterialConsumption
   */

  export type AggregateMaterialConsumption = {
    _count: MaterialConsumptionCountAggregateOutputType | null
    _avg: MaterialConsumptionAvgAggregateOutputType | null
    _sum: MaterialConsumptionSumAggregateOutputType | null
    _min: MaterialConsumptionMinAggregateOutputType | null
    _max: MaterialConsumptionMaxAggregateOutputType | null
  }

  export type MaterialConsumptionAvgAggregateOutputType = {
    quantityUsed: Decimal | null
    unitCost: Decimal | null
  }

  export type MaterialConsumptionSumAggregateOutputType = {
    quantityUsed: Decimal | null
    unitCost: Decimal | null
  }

  export type MaterialConsumptionMinAggregateOutputType = {
    id: string | null
    batchId: string | null
    materialPartId: string | null
    quantityUsed: Decimal | null
    unitCost: Decimal | null
    consumedAt: Date | null
    operatorId: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MaterialConsumptionMaxAggregateOutputType = {
    id: string | null
    batchId: string | null
    materialPartId: string | null
    quantityUsed: Decimal | null
    unitCost: Decimal | null
    consumedAt: Date | null
    operatorId: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MaterialConsumptionCountAggregateOutputType = {
    id: number
    batchId: number
    materialPartId: number
    quantityUsed: number
    unitCost: number
    consumedAt: number
    operatorId: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MaterialConsumptionAvgAggregateInputType = {
    quantityUsed?: true
    unitCost?: true
  }

  export type MaterialConsumptionSumAggregateInputType = {
    quantityUsed?: true
    unitCost?: true
  }

  export type MaterialConsumptionMinAggregateInputType = {
    id?: true
    batchId?: true
    materialPartId?: true
    quantityUsed?: true
    unitCost?: true
    consumedAt?: true
    operatorId?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MaterialConsumptionMaxAggregateInputType = {
    id?: true
    batchId?: true
    materialPartId?: true
    quantityUsed?: true
    unitCost?: true
    consumedAt?: true
    operatorId?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MaterialConsumptionCountAggregateInputType = {
    id?: true
    batchId?: true
    materialPartId?: true
    quantityUsed?: true
    unitCost?: true
    consumedAt?: true
    operatorId?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MaterialConsumptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MaterialConsumption to aggregate.
     */
    where?: MaterialConsumptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaterialConsumptions to fetch.
     */
    orderBy?: MaterialConsumptionOrderByWithRelationInput | MaterialConsumptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MaterialConsumptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaterialConsumptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaterialConsumptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MaterialConsumptions
    **/
    _count?: true | MaterialConsumptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MaterialConsumptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MaterialConsumptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MaterialConsumptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MaterialConsumptionMaxAggregateInputType
  }

  export type GetMaterialConsumptionAggregateType<T extends MaterialConsumptionAggregateArgs> = {
        [P in keyof T & keyof AggregateMaterialConsumption]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMaterialConsumption[P]>
      : GetScalarType<T[P], AggregateMaterialConsumption[P]>
  }




  export type MaterialConsumptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaterialConsumptionWhereInput
    orderBy?: MaterialConsumptionOrderByWithAggregationInput | MaterialConsumptionOrderByWithAggregationInput[]
    by: MaterialConsumptionScalarFieldEnum[] | MaterialConsumptionScalarFieldEnum
    having?: MaterialConsumptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MaterialConsumptionCountAggregateInputType | true
    _avg?: MaterialConsumptionAvgAggregateInputType
    _sum?: MaterialConsumptionSumAggregateInputType
    _min?: MaterialConsumptionMinAggregateInputType
    _max?: MaterialConsumptionMaxAggregateInputType
  }

  export type MaterialConsumptionGroupByOutputType = {
    id: string
    batchId: string
    materialPartId: string
    quantityUsed: Decimal
    unitCost: Decimal | null
    consumedAt: Date
    operatorId: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: MaterialConsumptionCountAggregateOutputType | null
    _avg: MaterialConsumptionAvgAggregateOutputType | null
    _sum: MaterialConsumptionSumAggregateOutputType | null
    _min: MaterialConsumptionMinAggregateOutputType | null
    _max: MaterialConsumptionMaxAggregateOutputType | null
  }

  type GetMaterialConsumptionGroupByPayload<T extends MaterialConsumptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MaterialConsumptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MaterialConsumptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MaterialConsumptionGroupByOutputType[P]>
            : GetScalarType<T[P], MaterialConsumptionGroupByOutputType[P]>
        }
      >
    >


  export type MaterialConsumptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    batchId?: boolean
    materialPartId?: boolean
    quantityUsed?: boolean
    unitCost?: boolean
    consumedAt?: boolean
    operatorId?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    materialPart?: boolean | PartDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["materialConsumption"]>

  export type MaterialConsumptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    batchId?: boolean
    materialPartId?: boolean
    quantityUsed?: boolean
    unitCost?: boolean
    consumedAt?: boolean
    operatorId?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    materialPart?: boolean | PartDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["materialConsumption"]>

  export type MaterialConsumptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    batchId?: boolean
    materialPartId?: boolean
    quantityUsed?: boolean
    unitCost?: boolean
    consumedAt?: boolean
    operatorId?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    materialPart?: boolean | PartDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["materialConsumption"]>

  export type MaterialConsumptionSelectScalar = {
    id?: boolean
    batchId?: boolean
    materialPartId?: boolean
    quantityUsed?: boolean
    unitCost?: boolean
    consumedAt?: boolean
    operatorId?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MaterialConsumptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "batchId" | "materialPartId" | "quantityUsed" | "unitCost" | "consumedAt" | "operatorId" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["materialConsumption"]>
  export type MaterialConsumptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    materialPart?: boolean | PartDefaultArgs<ExtArgs>
  }
  export type MaterialConsumptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    materialPart?: boolean | PartDefaultArgs<ExtArgs>
  }
  export type MaterialConsumptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    materialPart?: boolean | PartDefaultArgs<ExtArgs>
  }

  export type $MaterialConsumptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MaterialConsumption"
    objects: {
      batch: Prisma.$BatchPayload<ExtArgs>
      materialPart: Prisma.$PartPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      batchId: string
      materialPartId: string
      quantityUsed: Prisma.Decimal
      unitCost: Prisma.Decimal | null
      consumedAt: Date
      operatorId: string | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["materialConsumption"]>
    composites: {}
  }

  type MaterialConsumptionGetPayload<S extends boolean | null | undefined | MaterialConsumptionDefaultArgs> = $Result.GetResult<Prisma.$MaterialConsumptionPayload, S>

  type MaterialConsumptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MaterialConsumptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MaterialConsumptionCountAggregateInputType | true
    }

  export interface MaterialConsumptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MaterialConsumption'], meta: { name: 'MaterialConsumption' } }
    /**
     * Find zero or one MaterialConsumption that matches the filter.
     * @param {MaterialConsumptionFindUniqueArgs} args - Arguments to find a MaterialConsumption
     * @example
     * // Get one MaterialConsumption
     * const materialConsumption = await prisma.materialConsumption.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MaterialConsumptionFindUniqueArgs>(args: SelectSubset<T, MaterialConsumptionFindUniqueArgs<ExtArgs>>): Prisma__MaterialConsumptionClient<$Result.GetResult<Prisma.$MaterialConsumptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MaterialConsumption that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MaterialConsumptionFindUniqueOrThrowArgs} args - Arguments to find a MaterialConsumption
     * @example
     * // Get one MaterialConsumption
     * const materialConsumption = await prisma.materialConsumption.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MaterialConsumptionFindUniqueOrThrowArgs>(args: SelectSubset<T, MaterialConsumptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MaterialConsumptionClient<$Result.GetResult<Prisma.$MaterialConsumptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MaterialConsumption that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialConsumptionFindFirstArgs} args - Arguments to find a MaterialConsumption
     * @example
     * // Get one MaterialConsumption
     * const materialConsumption = await prisma.materialConsumption.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MaterialConsumptionFindFirstArgs>(args?: SelectSubset<T, MaterialConsumptionFindFirstArgs<ExtArgs>>): Prisma__MaterialConsumptionClient<$Result.GetResult<Prisma.$MaterialConsumptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MaterialConsumption that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialConsumptionFindFirstOrThrowArgs} args - Arguments to find a MaterialConsumption
     * @example
     * // Get one MaterialConsumption
     * const materialConsumption = await prisma.materialConsumption.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MaterialConsumptionFindFirstOrThrowArgs>(args?: SelectSubset<T, MaterialConsumptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__MaterialConsumptionClient<$Result.GetResult<Prisma.$MaterialConsumptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MaterialConsumptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialConsumptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MaterialConsumptions
     * const materialConsumptions = await prisma.materialConsumption.findMany()
     * 
     * // Get first 10 MaterialConsumptions
     * const materialConsumptions = await prisma.materialConsumption.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const materialConsumptionWithIdOnly = await prisma.materialConsumption.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MaterialConsumptionFindManyArgs>(args?: SelectSubset<T, MaterialConsumptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialConsumptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MaterialConsumption.
     * @param {MaterialConsumptionCreateArgs} args - Arguments to create a MaterialConsumption.
     * @example
     * // Create one MaterialConsumption
     * const MaterialConsumption = await prisma.materialConsumption.create({
     *   data: {
     *     // ... data to create a MaterialConsumption
     *   }
     * })
     * 
     */
    create<T extends MaterialConsumptionCreateArgs>(args: SelectSubset<T, MaterialConsumptionCreateArgs<ExtArgs>>): Prisma__MaterialConsumptionClient<$Result.GetResult<Prisma.$MaterialConsumptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MaterialConsumptions.
     * @param {MaterialConsumptionCreateManyArgs} args - Arguments to create many MaterialConsumptions.
     * @example
     * // Create many MaterialConsumptions
     * const materialConsumption = await prisma.materialConsumption.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MaterialConsumptionCreateManyArgs>(args?: SelectSubset<T, MaterialConsumptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MaterialConsumptions and returns the data saved in the database.
     * @param {MaterialConsumptionCreateManyAndReturnArgs} args - Arguments to create many MaterialConsumptions.
     * @example
     * // Create many MaterialConsumptions
     * const materialConsumption = await prisma.materialConsumption.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MaterialConsumptions and only return the `id`
     * const materialConsumptionWithIdOnly = await prisma.materialConsumption.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MaterialConsumptionCreateManyAndReturnArgs>(args?: SelectSubset<T, MaterialConsumptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialConsumptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MaterialConsumption.
     * @param {MaterialConsumptionDeleteArgs} args - Arguments to delete one MaterialConsumption.
     * @example
     * // Delete one MaterialConsumption
     * const MaterialConsumption = await prisma.materialConsumption.delete({
     *   where: {
     *     // ... filter to delete one MaterialConsumption
     *   }
     * })
     * 
     */
    delete<T extends MaterialConsumptionDeleteArgs>(args: SelectSubset<T, MaterialConsumptionDeleteArgs<ExtArgs>>): Prisma__MaterialConsumptionClient<$Result.GetResult<Prisma.$MaterialConsumptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MaterialConsumption.
     * @param {MaterialConsumptionUpdateArgs} args - Arguments to update one MaterialConsumption.
     * @example
     * // Update one MaterialConsumption
     * const materialConsumption = await prisma.materialConsumption.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MaterialConsumptionUpdateArgs>(args: SelectSubset<T, MaterialConsumptionUpdateArgs<ExtArgs>>): Prisma__MaterialConsumptionClient<$Result.GetResult<Prisma.$MaterialConsumptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MaterialConsumptions.
     * @param {MaterialConsumptionDeleteManyArgs} args - Arguments to filter MaterialConsumptions to delete.
     * @example
     * // Delete a few MaterialConsumptions
     * const { count } = await prisma.materialConsumption.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MaterialConsumptionDeleteManyArgs>(args?: SelectSubset<T, MaterialConsumptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MaterialConsumptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialConsumptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MaterialConsumptions
     * const materialConsumption = await prisma.materialConsumption.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MaterialConsumptionUpdateManyArgs>(args: SelectSubset<T, MaterialConsumptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MaterialConsumptions and returns the data updated in the database.
     * @param {MaterialConsumptionUpdateManyAndReturnArgs} args - Arguments to update many MaterialConsumptions.
     * @example
     * // Update many MaterialConsumptions
     * const materialConsumption = await prisma.materialConsumption.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MaterialConsumptions and only return the `id`
     * const materialConsumptionWithIdOnly = await prisma.materialConsumption.updateManyAndReturn({
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
    updateManyAndReturn<T extends MaterialConsumptionUpdateManyAndReturnArgs>(args: SelectSubset<T, MaterialConsumptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialConsumptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MaterialConsumption.
     * @param {MaterialConsumptionUpsertArgs} args - Arguments to update or create a MaterialConsumption.
     * @example
     * // Update or create a MaterialConsumption
     * const materialConsumption = await prisma.materialConsumption.upsert({
     *   create: {
     *     // ... data to create a MaterialConsumption
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MaterialConsumption we want to update
     *   }
     * })
     */
    upsert<T extends MaterialConsumptionUpsertArgs>(args: SelectSubset<T, MaterialConsumptionUpsertArgs<ExtArgs>>): Prisma__MaterialConsumptionClient<$Result.GetResult<Prisma.$MaterialConsumptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MaterialConsumptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialConsumptionCountArgs} args - Arguments to filter MaterialConsumptions to count.
     * @example
     * // Count the number of MaterialConsumptions
     * const count = await prisma.materialConsumption.count({
     *   where: {
     *     // ... the filter for the MaterialConsumptions we want to count
     *   }
     * })
    **/
    count<T extends MaterialConsumptionCountArgs>(
      args?: Subset<T, MaterialConsumptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MaterialConsumptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MaterialConsumption.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialConsumptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MaterialConsumptionAggregateArgs>(args: Subset<T, MaterialConsumptionAggregateArgs>): Prisma.PrismaPromise<GetMaterialConsumptionAggregateType<T>>

    /**
     * Group by MaterialConsumption.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialConsumptionGroupByArgs} args - Group by arguments.
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
      T extends MaterialConsumptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MaterialConsumptionGroupByArgs['orderBy'] }
        : { orderBy?: MaterialConsumptionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MaterialConsumptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaterialConsumptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MaterialConsumption model
   */
  readonly fields: MaterialConsumptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MaterialConsumption.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MaterialConsumptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    batch<T extends BatchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BatchDefaultArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    materialPart<T extends PartDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PartDefaultArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the MaterialConsumption model
   */
  interface MaterialConsumptionFieldRefs {
    readonly id: FieldRef<"MaterialConsumption", 'String'>
    readonly batchId: FieldRef<"MaterialConsumption", 'String'>
    readonly materialPartId: FieldRef<"MaterialConsumption", 'String'>
    readonly quantityUsed: FieldRef<"MaterialConsumption", 'Decimal'>
    readonly unitCost: FieldRef<"MaterialConsumption", 'Decimal'>
    readonly consumedAt: FieldRef<"MaterialConsumption", 'DateTime'>
    readonly operatorId: FieldRef<"MaterialConsumption", 'String'>
    readonly notes: FieldRef<"MaterialConsumption", 'String'>
    readonly createdAt: FieldRef<"MaterialConsumption", 'DateTime'>
    readonly updatedAt: FieldRef<"MaterialConsumption", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MaterialConsumption findUnique
   */
  export type MaterialConsumptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialConsumption
     */
    select?: MaterialConsumptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialConsumption
     */
    omit?: MaterialConsumptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialConsumptionInclude<ExtArgs> | null
    /**
     * Filter, which MaterialConsumption to fetch.
     */
    where: MaterialConsumptionWhereUniqueInput
  }

  /**
   * MaterialConsumption findUniqueOrThrow
   */
  export type MaterialConsumptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialConsumption
     */
    select?: MaterialConsumptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialConsumption
     */
    omit?: MaterialConsumptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialConsumptionInclude<ExtArgs> | null
    /**
     * Filter, which MaterialConsumption to fetch.
     */
    where: MaterialConsumptionWhereUniqueInput
  }

  /**
   * MaterialConsumption findFirst
   */
  export type MaterialConsumptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialConsumption
     */
    select?: MaterialConsumptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialConsumption
     */
    omit?: MaterialConsumptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialConsumptionInclude<ExtArgs> | null
    /**
     * Filter, which MaterialConsumption to fetch.
     */
    where?: MaterialConsumptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaterialConsumptions to fetch.
     */
    orderBy?: MaterialConsumptionOrderByWithRelationInput | MaterialConsumptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MaterialConsumptions.
     */
    cursor?: MaterialConsumptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaterialConsumptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaterialConsumptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MaterialConsumptions.
     */
    distinct?: MaterialConsumptionScalarFieldEnum | MaterialConsumptionScalarFieldEnum[]
  }

  /**
   * MaterialConsumption findFirstOrThrow
   */
  export type MaterialConsumptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialConsumption
     */
    select?: MaterialConsumptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialConsumption
     */
    omit?: MaterialConsumptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialConsumptionInclude<ExtArgs> | null
    /**
     * Filter, which MaterialConsumption to fetch.
     */
    where?: MaterialConsumptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaterialConsumptions to fetch.
     */
    orderBy?: MaterialConsumptionOrderByWithRelationInput | MaterialConsumptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MaterialConsumptions.
     */
    cursor?: MaterialConsumptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaterialConsumptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaterialConsumptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MaterialConsumptions.
     */
    distinct?: MaterialConsumptionScalarFieldEnum | MaterialConsumptionScalarFieldEnum[]
  }

  /**
   * MaterialConsumption findMany
   */
  export type MaterialConsumptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialConsumption
     */
    select?: MaterialConsumptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialConsumption
     */
    omit?: MaterialConsumptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialConsumptionInclude<ExtArgs> | null
    /**
     * Filter, which MaterialConsumptions to fetch.
     */
    where?: MaterialConsumptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaterialConsumptions to fetch.
     */
    orderBy?: MaterialConsumptionOrderByWithRelationInput | MaterialConsumptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MaterialConsumptions.
     */
    cursor?: MaterialConsumptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaterialConsumptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaterialConsumptions.
     */
    skip?: number
    distinct?: MaterialConsumptionScalarFieldEnum | MaterialConsumptionScalarFieldEnum[]
  }

  /**
   * MaterialConsumption create
   */
  export type MaterialConsumptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialConsumption
     */
    select?: MaterialConsumptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialConsumption
     */
    omit?: MaterialConsumptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialConsumptionInclude<ExtArgs> | null
    /**
     * The data needed to create a MaterialConsumption.
     */
    data: XOR<MaterialConsumptionCreateInput, MaterialConsumptionUncheckedCreateInput>
  }

  /**
   * MaterialConsumption createMany
   */
  export type MaterialConsumptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MaterialConsumptions.
     */
    data: MaterialConsumptionCreateManyInput | MaterialConsumptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MaterialConsumption createManyAndReturn
   */
  export type MaterialConsumptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialConsumption
     */
    select?: MaterialConsumptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialConsumption
     */
    omit?: MaterialConsumptionOmit<ExtArgs> | null
    /**
     * The data used to create many MaterialConsumptions.
     */
    data: MaterialConsumptionCreateManyInput | MaterialConsumptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialConsumptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MaterialConsumption update
   */
  export type MaterialConsumptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialConsumption
     */
    select?: MaterialConsumptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialConsumption
     */
    omit?: MaterialConsumptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialConsumptionInclude<ExtArgs> | null
    /**
     * The data needed to update a MaterialConsumption.
     */
    data: XOR<MaterialConsumptionUpdateInput, MaterialConsumptionUncheckedUpdateInput>
    /**
     * Choose, which MaterialConsumption to update.
     */
    where: MaterialConsumptionWhereUniqueInput
  }

  /**
   * MaterialConsumption updateMany
   */
  export type MaterialConsumptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MaterialConsumptions.
     */
    data: XOR<MaterialConsumptionUpdateManyMutationInput, MaterialConsumptionUncheckedUpdateManyInput>
    /**
     * Filter which MaterialConsumptions to update
     */
    where?: MaterialConsumptionWhereInput
    /**
     * Limit how many MaterialConsumptions to update.
     */
    limit?: number
  }

  /**
   * MaterialConsumption updateManyAndReturn
   */
  export type MaterialConsumptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialConsumption
     */
    select?: MaterialConsumptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialConsumption
     */
    omit?: MaterialConsumptionOmit<ExtArgs> | null
    /**
     * The data used to update MaterialConsumptions.
     */
    data: XOR<MaterialConsumptionUpdateManyMutationInput, MaterialConsumptionUncheckedUpdateManyInput>
    /**
     * Filter which MaterialConsumptions to update
     */
    where?: MaterialConsumptionWhereInput
    /**
     * Limit how many MaterialConsumptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialConsumptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MaterialConsumption upsert
   */
  export type MaterialConsumptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialConsumption
     */
    select?: MaterialConsumptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialConsumption
     */
    omit?: MaterialConsumptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialConsumptionInclude<ExtArgs> | null
    /**
     * The filter to search for the MaterialConsumption to update in case it exists.
     */
    where: MaterialConsumptionWhereUniqueInput
    /**
     * In case the MaterialConsumption found by the `where` argument doesn't exist, create a new MaterialConsumption with this data.
     */
    create: XOR<MaterialConsumptionCreateInput, MaterialConsumptionUncheckedCreateInput>
    /**
     * In case the MaterialConsumption was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MaterialConsumptionUpdateInput, MaterialConsumptionUncheckedUpdateInput>
  }

  /**
   * MaterialConsumption delete
   */
  export type MaterialConsumptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialConsumption
     */
    select?: MaterialConsumptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialConsumption
     */
    omit?: MaterialConsumptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialConsumptionInclude<ExtArgs> | null
    /**
     * Filter which MaterialConsumption to delete.
     */
    where: MaterialConsumptionWhereUniqueInput
  }

  /**
   * MaterialConsumption deleteMany
   */
  export type MaterialConsumptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MaterialConsumptions to delete
     */
    where?: MaterialConsumptionWhereInput
    /**
     * Limit how many MaterialConsumptions to delete.
     */
    limit?: number
  }

  /**
   * MaterialConsumption without action
   */
  export type MaterialConsumptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialConsumption
     */
    select?: MaterialConsumptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialConsumption
     */
    omit?: MaterialConsumptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialConsumptionInclude<ExtArgs> | null
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


  export const PartScalarFieldEnum: {
    id: 'id',
    partNumber: 'partNumber',
    partName: 'partName',
    partType: 'partType',
    drawingNumber: 'drawingNumber',
    revisionLevel: 'revisionLevel',
    description: 'description',
    materialSpec: 'materialSpec',
    unitOfMeasure: 'unitOfMeasure',
    standardCost: 'standardCost',
    leadTime: 'leadTime',
    active: 'active',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PartScalarFieldEnum = (typeof PartScalarFieldEnum)[keyof typeof PartScalarFieldEnum]


  export const BOMComponentScalarFieldEnum: {
    id: 'id',
    parentPartId: 'parentPartId',
    childPartId: 'childPartId',
    quantity: 'quantity',
    unitOfMeasure: 'unitOfMeasure',
    scrapFactor: 'scrapFactor',
    operation: 'operation',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BOMComponentScalarFieldEnum = (typeof BOMComponentScalarFieldEnum)[keyof typeof BOMComponentScalarFieldEnum]


  export const OrderLineItemScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    partId: 'partId',
    quantity: 'quantity',
    unitPrice: 'unitPrice',
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
    storedFileName: 'storedFileName',
    filePath: 'filePath',
    fileType: 'fileType',
    mimeType: 'mimeType',
    fileSize: 'fileSize',
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


  export const MaterialConsumptionScalarFieldEnum: {
    id: 'id',
    batchId: 'batchId',
    materialPartId: 'materialPartId',
    quantityUsed: 'quantityUsed',
    unitCost: 'unitCost',
    consumedAt: 'consumedAt',
    operatorId: 'operatorId',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MaterialConsumptionScalarFieldEnum = (typeof MaterialConsumptionScalarFieldEnum)[keyof typeof MaterialConsumptionScalarFieldEnum]


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
   * Reference to a field of type 'PartType'
   */
  export type EnumPartTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PartType'>
    


  /**
   * Reference to a field of type 'PartType[]'
   */
  export type ListEnumPartTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PartType[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


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

  export type PartWhereInput = {
    AND?: PartWhereInput | PartWhereInput[]
    OR?: PartWhereInput[]
    NOT?: PartWhereInput | PartWhereInput[]
    id?: StringFilter<"Part"> | string
    partNumber?: StringFilter<"Part"> | string
    partName?: StringFilter<"Part"> | string
    partType?: EnumPartTypeFilter<"Part"> | $Enums.PartType
    drawingNumber?: StringNullableFilter<"Part"> | string | null
    revisionLevel?: StringNullableFilter<"Part"> | string | null
    description?: StringNullableFilter<"Part"> | string | null
    materialSpec?: StringNullableFilter<"Part"> | string | null
    unitOfMeasure?: StringNullableFilter<"Part"> | string | null
    standardCost?: DecimalNullableFilter<"Part"> | Decimal | DecimalJsLike | number | string | null
    leadTime?: IntNullableFilter<"Part"> | number | null
    active?: BoolFilter<"Part"> | boolean
    notes?: StringNullableFilter<"Part"> | string | null
    createdAt?: DateTimeFilter<"Part"> | Date | string
    updatedAt?: DateTimeFilter<"Part"> | Date | string
    parentBOMs?: BOMComponentListRelationFilter
    childBOMs?: BOMComponentListRelationFilter
    orderLineItems?: OrderLineItemListRelationFilter
    materialConsumptions?: MaterialConsumptionListRelationFilter
  }

  export type PartOrderByWithRelationInput = {
    id?: SortOrder
    partNumber?: SortOrder
    partName?: SortOrder
    partType?: SortOrder
    drawingNumber?: SortOrderInput | SortOrder
    revisionLevel?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    materialSpec?: SortOrderInput | SortOrder
    unitOfMeasure?: SortOrderInput | SortOrder
    standardCost?: SortOrderInput | SortOrder
    leadTime?: SortOrderInput | SortOrder
    active?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    parentBOMs?: BOMComponentOrderByRelationAggregateInput
    childBOMs?: BOMComponentOrderByRelationAggregateInput
    orderLineItems?: OrderLineItemOrderByRelationAggregateInput
    materialConsumptions?: MaterialConsumptionOrderByRelationAggregateInput
  }

  export type PartWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    partNumber?: string
    AND?: PartWhereInput | PartWhereInput[]
    OR?: PartWhereInput[]
    NOT?: PartWhereInput | PartWhereInput[]
    partName?: StringFilter<"Part"> | string
    partType?: EnumPartTypeFilter<"Part"> | $Enums.PartType
    drawingNumber?: StringNullableFilter<"Part"> | string | null
    revisionLevel?: StringNullableFilter<"Part"> | string | null
    description?: StringNullableFilter<"Part"> | string | null
    materialSpec?: StringNullableFilter<"Part"> | string | null
    unitOfMeasure?: StringNullableFilter<"Part"> | string | null
    standardCost?: DecimalNullableFilter<"Part"> | Decimal | DecimalJsLike | number | string | null
    leadTime?: IntNullableFilter<"Part"> | number | null
    active?: BoolFilter<"Part"> | boolean
    notes?: StringNullableFilter<"Part"> | string | null
    createdAt?: DateTimeFilter<"Part"> | Date | string
    updatedAt?: DateTimeFilter<"Part"> | Date | string
    parentBOMs?: BOMComponentListRelationFilter
    childBOMs?: BOMComponentListRelationFilter
    orderLineItems?: OrderLineItemListRelationFilter
    materialConsumptions?: MaterialConsumptionListRelationFilter
  }, "id" | "partNumber">

  export type PartOrderByWithAggregationInput = {
    id?: SortOrder
    partNumber?: SortOrder
    partName?: SortOrder
    partType?: SortOrder
    drawingNumber?: SortOrderInput | SortOrder
    revisionLevel?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    materialSpec?: SortOrderInput | SortOrder
    unitOfMeasure?: SortOrderInput | SortOrder
    standardCost?: SortOrderInput | SortOrder
    leadTime?: SortOrderInput | SortOrder
    active?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PartCountOrderByAggregateInput
    _avg?: PartAvgOrderByAggregateInput
    _max?: PartMaxOrderByAggregateInput
    _min?: PartMinOrderByAggregateInput
    _sum?: PartSumOrderByAggregateInput
  }

  export type PartScalarWhereWithAggregatesInput = {
    AND?: PartScalarWhereWithAggregatesInput | PartScalarWhereWithAggregatesInput[]
    OR?: PartScalarWhereWithAggregatesInput[]
    NOT?: PartScalarWhereWithAggregatesInput | PartScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Part"> | string
    partNumber?: StringWithAggregatesFilter<"Part"> | string
    partName?: StringWithAggregatesFilter<"Part"> | string
    partType?: EnumPartTypeWithAggregatesFilter<"Part"> | $Enums.PartType
    drawingNumber?: StringNullableWithAggregatesFilter<"Part"> | string | null
    revisionLevel?: StringNullableWithAggregatesFilter<"Part"> | string | null
    description?: StringNullableWithAggregatesFilter<"Part"> | string | null
    materialSpec?: StringNullableWithAggregatesFilter<"Part"> | string | null
    unitOfMeasure?: StringNullableWithAggregatesFilter<"Part"> | string | null
    standardCost?: DecimalNullableWithAggregatesFilter<"Part"> | Decimal | DecimalJsLike | number | string | null
    leadTime?: IntNullableWithAggregatesFilter<"Part"> | number | null
    active?: BoolWithAggregatesFilter<"Part"> | boolean
    notes?: StringNullableWithAggregatesFilter<"Part"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Part"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Part"> | Date | string
  }

  export type BOMComponentWhereInput = {
    AND?: BOMComponentWhereInput | BOMComponentWhereInput[]
    OR?: BOMComponentWhereInput[]
    NOT?: BOMComponentWhereInput | BOMComponentWhereInput[]
    id?: StringFilter<"BOMComponent"> | string
    parentPartId?: StringFilter<"BOMComponent"> | string
    childPartId?: StringFilter<"BOMComponent"> | string
    quantity?: DecimalFilter<"BOMComponent"> | Decimal | DecimalJsLike | number | string
    unitOfMeasure?: StringNullableFilter<"BOMComponent"> | string | null
    scrapFactor?: DecimalNullableFilter<"BOMComponent"> | Decimal | DecimalJsLike | number | string | null
    operation?: StringNullableFilter<"BOMComponent"> | string | null
    notes?: StringNullableFilter<"BOMComponent"> | string | null
    createdAt?: DateTimeFilter<"BOMComponent"> | Date | string
    updatedAt?: DateTimeFilter<"BOMComponent"> | Date | string
    parentPart?: XOR<PartScalarRelationFilter, PartWhereInput>
    childPart?: XOR<PartScalarRelationFilter, PartWhereInput>
  }

  export type BOMComponentOrderByWithRelationInput = {
    id?: SortOrder
    parentPartId?: SortOrder
    childPartId?: SortOrder
    quantity?: SortOrder
    unitOfMeasure?: SortOrderInput | SortOrder
    scrapFactor?: SortOrderInput | SortOrder
    operation?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    parentPart?: PartOrderByWithRelationInput
    childPart?: PartOrderByWithRelationInput
  }

  export type BOMComponentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    parentPartId_childPartId?: BOMComponentParentPartIdChildPartIdCompoundUniqueInput
    AND?: BOMComponentWhereInput | BOMComponentWhereInput[]
    OR?: BOMComponentWhereInput[]
    NOT?: BOMComponentWhereInput | BOMComponentWhereInput[]
    parentPartId?: StringFilter<"BOMComponent"> | string
    childPartId?: StringFilter<"BOMComponent"> | string
    quantity?: DecimalFilter<"BOMComponent"> | Decimal | DecimalJsLike | number | string
    unitOfMeasure?: StringNullableFilter<"BOMComponent"> | string | null
    scrapFactor?: DecimalNullableFilter<"BOMComponent"> | Decimal | DecimalJsLike | number | string | null
    operation?: StringNullableFilter<"BOMComponent"> | string | null
    notes?: StringNullableFilter<"BOMComponent"> | string | null
    createdAt?: DateTimeFilter<"BOMComponent"> | Date | string
    updatedAt?: DateTimeFilter<"BOMComponent"> | Date | string
    parentPart?: XOR<PartScalarRelationFilter, PartWhereInput>
    childPart?: XOR<PartScalarRelationFilter, PartWhereInput>
  }, "id" | "parentPartId_childPartId">

  export type BOMComponentOrderByWithAggregationInput = {
    id?: SortOrder
    parentPartId?: SortOrder
    childPartId?: SortOrder
    quantity?: SortOrder
    unitOfMeasure?: SortOrderInput | SortOrder
    scrapFactor?: SortOrderInput | SortOrder
    operation?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BOMComponentCountOrderByAggregateInput
    _avg?: BOMComponentAvgOrderByAggregateInput
    _max?: BOMComponentMaxOrderByAggregateInput
    _min?: BOMComponentMinOrderByAggregateInput
    _sum?: BOMComponentSumOrderByAggregateInput
  }

  export type BOMComponentScalarWhereWithAggregatesInput = {
    AND?: BOMComponentScalarWhereWithAggregatesInput | BOMComponentScalarWhereWithAggregatesInput[]
    OR?: BOMComponentScalarWhereWithAggregatesInput[]
    NOT?: BOMComponentScalarWhereWithAggregatesInput | BOMComponentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BOMComponent"> | string
    parentPartId?: StringWithAggregatesFilter<"BOMComponent"> | string
    childPartId?: StringWithAggregatesFilter<"BOMComponent"> | string
    quantity?: DecimalWithAggregatesFilter<"BOMComponent"> | Decimal | DecimalJsLike | number | string
    unitOfMeasure?: StringNullableWithAggregatesFilter<"BOMComponent"> | string | null
    scrapFactor?: DecimalNullableWithAggregatesFilter<"BOMComponent"> | Decimal | DecimalJsLike | number | string | null
    operation?: StringNullableWithAggregatesFilter<"BOMComponent"> | string | null
    notes?: StringNullableWithAggregatesFilter<"BOMComponent"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"BOMComponent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BOMComponent"> | Date | string
  }

  export type OrderLineItemWhereInput = {
    AND?: OrderLineItemWhereInput | OrderLineItemWhereInput[]
    OR?: OrderLineItemWhereInput[]
    NOT?: OrderLineItemWhereInput | OrderLineItemWhereInput[]
    id?: StringFilter<"OrderLineItem"> | string
    orderId?: StringFilter<"OrderLineItem"> | string
    partId?: StringFilter<"OrderLineItem"> | string
    quantity?: IntFilter<"OrderLineItem"> | number
    unitPrice?: DecimalNullableFilter<"OrderLineItem"> | Decimal | DecimalJsLike | number | string | null
    dueDate?: DateTimeNullableFilter<"OrderLineItem"> | Date | string | null
    notes?: StringNullableFilter<"OrderLineItem"> | string | null
    createdAt?: DateTimeFilter<"OrderLineItem"> | Date | string
    updatedAt?: DateTimeFilter<"OrderLineItem"> | Date | string
    purchaseOrder?: XOR<PurchaseOrderScalarRelationFilter, PurchaseOrderWhereInput>
    part?: XOR<PartScalarRelationFilter, PartWhereInput>
    fileAttachments?: FileAttachmentListRelationFilter
    batches?: BatchListRelationFilter
  }

  export type OrderLineItemOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    partId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrderInput | SortOrder
    dueDate?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    purchaseOrder?: PurchaseOrderOrderByWithRelationInput
    part?: PartOrderByWithRelationInput
    fileAttachments?: FileAttachmentOrderByRelationAggregateInput
    batches?: BatchOrderByRelationAggregateInput
  }

  export type OrderLineItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderLineItemWhereInput | OrderLineItemWhereInput[]
    OR?: OrderLineItemWhereInput[]
    NOT?: OrderLineItemWhereInput | OrderLineItemWhereInput[]
    orderId?: StringFilter<"OrderLineItem"> | string
    partId?: StringFilter<"OrderLineItem"> | string
    quantity?: IntFilter<"OrderLineItem"> | number
    unitPrice?: DecimalNullableFilter<"OrderLineItem"> | Decimal | DecimalJsLike | number | string | null
    dueDate?: DateTimeNullableFilter<"OrderLineItem"> | Date | string | null
    notes?: StringNullableFilter<"OrderLineItem"> | string | null
    createdAt?: DateTimeFilter<"OrderLineItem"> | Date | string
    updatedAt?: DateTimeFilter<"OrderLineItem"> | Date | string
    purchaseOrder?: XOR<PurchaseOrderScalarRelationFilter, PurchaseOrderWhereInput>
    part?: XOR<PartScalarRelationFilter, PartWhereInput>
    fileAttachments?: FileAttachmentListRelationFilter
    batches?: BatchListRelationFilter
  }, "id">

  export type OrderLineItemOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    partId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrderInput | SortOrder
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
    partId?: StringWithAggregatesFilter<"OrderLineItem"> | string
    quantity?: IntWithAggregatesFilter<"OrderLineItem"> | number
    unitPrice?: DecimalNullableWithAggregatesFilter<"OrderLineItem"> | Decimal | DecimalJsLike | number | string | null
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
    storedFileName?: StringFilter<"FileAttachment"> | string
    filePath?: StringFilter<"FileAttachment"> | string
    fileType?: StringFilter<"FileAttachment"> | string
    mimeType?: StringFilter<"FileAttachment"> | string
    fileSize?: IntFilter<"FileAttachment"> | number
    uploadedBy?: StringFilter<"FileAttachment"> | string
    description?: StringNullableFilter<"FileAttachment"> | string | null
    createdAt?: DateTimeFilter<"FileAttachment"> | Date | string
    lineItem?: XOR<OrderLineItemScalarRelationFilter, OrderLineItemWhereInput>
  }

  export type FileAttachmentOrderByWithRelationInput = {
    id?: SortOrder
    lineItemId?: SortOrder
    fileName?: SortOrder
    storedFileName?: SortOrder
    filePath?: SortOrder
    fileType?: SortOrder
    mimeType?: SortOrder
    fileSize?: SortOrder
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
    storedFileName?: StringFilter<"FileAttachment"> | string
    filePath?: StringFilter<"FileAttachment"> | string
    fileType?: StringFilter<"FileAttachment"> | string
    mimeType?: StringFilter<"FileAttachment"> | string
    fileSize?: IntFilter<"FileAttachment"> | number
    uploadedBy?: StringFilter<"FileAttachment"> | string
    description?: StringNullableFilter<"FileAttachment"> | string | null
    createdAt?: DateTimeFilter<"FileAttachment"> | Date | string
    lineItem?: XOR<OrderLineItemScalarRelationFilter, OrderLineItemWhereInput>
  }, "id">

  export type FileAttachmentOrderByWithAggregationInput = {
    id?: SortOrder
    lineItemId?: SortOrder
    fileName?: SortOrder
    storedFileName?: SortOrder
    filePath?: SortOrder
    fileType?: SortOrder
    mimeType?: SortOrder
    fileSize?: SortOrder
    uploadedBy?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: FileAttachmentCountOrderByAggregateInput
    _avg?: FileAttachmentAvgOrderByAggregateInput
    _max?: FileAttachmentMaxOrderByAggregateInput
    _min?: FileAttachmentMinOrderByAggregateInput
    _sum?: FileAttachmentSumOrderByAggregateInput
  }

  export type FileAttachmentScalarWhereWithAggregatesInput = {
    AND?: FileAttachmentScalarWhereWithAggregatesInput | FileAttachmentScalarWhereWithAggregatesInput[]
    OR?: FileAttachmentScalarWhereWithAggregatesInput[]
    NOT?: FileAttachmentScalarWhereWithAggregatesInput | FileAttachmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FileAttachment"> | string
    lineItemId?: StringWithAggregatesFilter<"FileAttachment"> | string
    fileName?: StringWithAggregatesFilter<"FileAttachment"> | string
    storedFileName?: StringWithAggregatesFilter<"FileAttachment"> | string
    filePath?: StringWithAggregatesFilter<"FileAttachment"> | string
    fileType?: StringWithAggregatesFilter<"FileAttachment"> | string
    mimeType?: StringWithAggregatesFilter<"FileAttachment"> | string
    fileSize?: IntWithAggregatesFilter<"FileAttachment"> | number
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
    materialConsumption?: MaterialConsumptionListRelationFilter
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
    materialConsumption?: MaterialConsumptionOrderByRelationAggregateInput
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
    materialConsumption?: MaterialConsumptionListRelationFilter
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

  export type MaterialConsumptionWhereInput = {
    AND?: MaterialConsumptionWhereInput | MaterialConsumptionWhereInput[]
    OR?: MaterialConsumptionWhereInput[]
    NOT?: MaterialConsumptionWhereInput | MaterialConsumptionWhereInput[]
    id?: StringFilter<"MaterialConsumption"> | string
    batchId?: StringFilter<"MaterialConsumption"> | string
    materialPartId?: StringFilter<"MaterialConsumption"> | string
    quantityUsed?: DecimalFilter<"MaterialConsumption"> | Decimal | DecimalJsLike | number | string
    unitCost?: DecimalNullableFilter<"MaterialConsumption"> | Decimal | DecimalJsLike | number | string | null
    consumedAt?: DateTimeFilter<"MaterialConsumption"> | Date | string
    operatorId?: StringNullableFilter<"MaterialConsumption"> | string | null
    notes?: StringNullableFilter<"MaterialConsumption"> | string | null
    createdAt?: DateTimeFilter<"MaterialConsumption"> | Date | string
    updatedAt?: DateTimeFilter<"MaterialConsumption"> | Date | string
    batch?: XOR<BatchScalarRelationFilter, BatchWhereInput>
    materialPart?: XOR<PartScalarRelationFilter, PartWhereInput>
  }

  export type MaterialConsumptionOrderByWithRelationInput = {
    id?: SortOrder
    batchId?: SortOrder
    materialPartId?: SortOrder
    quantityUsed?: SortOrder
    unitCost?: SortOrderInput | SortOrder
    consumedAt?: SortOrder
    operatorId?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    batch?: BatchOrderByWithRelationInput
    materialPart?: PartOrderByWithRelationInput
  }

  export type MaterialConsumptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    batchId_materialPartId?: MaterialConsumptionBatchIdMaterialPartIdCompoundUniqueInput
    AND?: MaterialConsumptionWhereInput | MaterialConsumptionWhereInput[]
    OR?: MaterialConsumptionWhereInput[]
    NOT?: MaterialConsumptionWhereInput | MaterialConsumptionWhereInput[]
    batchId?: StringFilter<"MaterialConsumption"> | string
    materialPartId?: StringFilter<"MaterialConsumption"> | string
    quantityUsed?: DecimalFilter<"MaterialConsumption"> | Decimal | DecimalJsLike | number | string
    unitCost?: DecimalNullableFilter<"MaterialConsumption"> | Decimal | DecimalJsLike | number | string | null
    consumedAt?: DateTimeFilter<"MaterialConsumption"> | Date | string
    operatorId?: StringNullableFilter<"MaterialConsumption"> | string | null
    notes?: StringNullableFilter<"MaterialConsumption"> | string | null
    createdAt?: DateTimeFilter<"MaterialConsumption"> | Date | string
    updatedAt?: DateTimeFilter<"MaterialConsumption"> | Date | string
    batch?: XOR<BatchScalarRelationFilter, BatchWhereInput>
    materialPart?: XOR<PartScalarRelationFilter, PartWhereInput>
  }, "id" | "batchId_materialPartId">

  export type MaterialConsumptionOrderByWithAggregationInput = {
    id?: SortOrder
    batchId?: SortOrder
    materialPartId?: SortOrder
    quantityUsed?: SortOrder
    unitCost?: SortOrderInput | SortOrder
    consumedAt?: SortOrder
    operatorId?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MaterialConsumptionCountOrderByAggregateInput
    _avg?: MaterialConsumptionAvgOrderByAggregateInput
    _max?: MaterialConsumptionMaxOrderByAggregateInput
    _min?: MaterialConsumptionMinOrderByAggregateInput
    _sum?: MaterialConsumptionSumOrderByAggregateInput
  }

  export type MaterialConsumptionScalarWhereWithAggregatesInput = {
    AND?: MaterialConsumptionScalarWhereWithAggregatesInput | MaterialConsumptionScalarWhereWithAggregatesInput[]
    OR?: MaterialConsumptionScalarWhereWithAggregatesInput[]
    NOT?: MaterialConsumptionScalarWhereWithAggregatesInput | MaterialConsumptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MaterialConsumption"> | string
    batchId?: StringWithAggregatesFilter<"MaterialConsumption"> | string
    materialPartId?: StringWithAggregatesFilter<"MaterialConsumption"> | string
    quantityUsed?: DecimalWithAggregatesFilter<"MaterialConsumption"> | Decimal | DecimalJsLike | number | string
    unitCost?: DecimalNullableWithAggregatesFilter<"MaterialConsumption"> | Decimal | DecimalJsLike | number | string | null
    consumedAt?: DateTimeWithAggregatesFilter<"MaterialConsumption"> | Date | string
    operatorId?: StringNullableWithAggregatesFilter<"MaterialConsumption"> | string | null
    notes?: StringNullableWithAggregatesFilter<"MaterialConsumption"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MaterialConsumption"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MaterialConsumption"> | Date | string
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

  export type PartCreateInput = {
    id?: string
    partNumber: string
    partName: string
    partType: $Enums.PartType
    drawingNumber?: string | null
    revisionLevel?: string | null
    description?: string | null
    materialSpec?: string | null
    unitOfMeasure?: string | null
    standardCost?: Decimal | DecimalJsLike | number | string | null
    leadTime?: number | null
    active?: boolean
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parentBOMs?: BOMComponentCreateNestedManyWithoutParentPartInput
    childBOMs?: BOMComponentCreateNestedManyWithoutChildPartInput
    orderLineItems?: OrderLineItemCreateNestedManyWithoutPartInput
    materialConsumptions?: MaterialConsumptionCreateNestedManyWithoutMaterialPartInput
  }

  export type PartUncheckedCreateInput = {
    id?: string
    partNumber: string
    partName: string
    partType: $Enums.PartType
    drawingNumber?: string | null
    revisionLevel?: string | null
    description?: string | null
    materialSpec?: string | null
    unitOfMeasure?: string | null
    standardCost?: Decimal | DecimalJsLike | number | string | null
    leadTime?: number | null
    active?: boolean
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parentBOMs?: BOMComponentUncheckedCreateNestedManyWithoutParentPartInput
    childBOMs?: BOMComponentUncheckedCreateNestedManyWithoutChildPartInput
    orderLineItems?: OrderLineItemUncheckedCreateNestedManyWithoutPartInput
    materialConsumptions?: MaterialConsumptionUncheckedCreateNestedManyWithoutMaterialPartInput
  }

  export type PartUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    partType?: EnumPartTypeFieldUpdateOperationsInput | $Enums.PartType
    drawingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    revisionLevel?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    materialSpec?: NullableStringFieldUpdateOperationsInput | string | null
    unitOfMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    standardCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    leadTime?: NullableIntFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentBOMs?: BOMComponentUpdateManyWithoutParentPartNestedInput
    childBOMs?: BOMComponentUpdateManyWithoutChildPartNestedInput
    orderLineItems?: OrderLineItemUpdateManyWithoutPartNestedInput
    materialConsumptions?: MaterialConsumptionUpdateManyWithoutMaterialPartNestedInput
  }

  export type PartUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    partType?: EnumPartTypeFieldUpdateOperationsInput | $Enums.PartType
    drawingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    revisionLevel?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    materialSpec?: NullableStringFieldUpdateOperationsInput | string | null
    unitOfMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    standardCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    leadTime?: NullableIntFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentBOMs?: BOMComponentUncheckedUpdateManyWithoutParentPartNestedInput
    childBOMs?: BOMComponentUncheckedUpdateManyWithoutChildPartNestedInput
    orderLineItems?: OrderLineItemUncheckedUpdateManyWithoutPartNestedInput
    materialConsumptions?: MaterialConsumptionUncheckedUpdateManyWithoutMaterialPartNestedInput
  }

  export type PartCreateManyInput = {
    id?: string
    partNumber: string
    partName: string
    partType: $Enums.PartType
    drawingNumber?: string | null
    revisionLevel?: string | null
    description?: string | null
    materialSpec?: string | null
    unitOfMeasure?: string | null
    standardCost?: Decimal | DecimalJsLike | number | string | null
    leadTime?: number | null
    active?: boolean
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    partType?: EnumPartTypeFieldUpdateOperationsInput | $Enums.PartType
    drawingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    revisionLevel?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    materialSpec?: NullableStringFieldUpdateOperationsInput | string | null
    unitOfMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    standardCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    leadTime?: NullableIntFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    partType?: EnumPartTypeFieldUpdateOperationsInput | $Enums.PartType
    drawingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    revisionLevel?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    materialSpec?: NullableStringFieldUpdateOperationsInput | string | null
    unitOfMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    standardCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    leadTime?: NullableIntFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BOMComponentCreateInput = {
    id?: string
    quantity: Decimal | DecimalJsLike | number | string
    unitOfMeasure?: string | null
    scrapFactor?: Decimal | DecimalJsLike | number | string | null
    operation?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parentPart: PartCreateNestedOneWithoutParentBOMsInput
    childPart: PartCreateNestedOneWithoutChildBOMsInput
  }

  export type BOMComponentUncheckedCreateInput = {
    id?: string
    parentPartId: string
    childPartId: string
    quantity: Decimal | DecimalJsLike | number | string
    unitOfMeasure?: string | null
    scrapFactor?: Decimal | DecimalJsLike | number | string | null
    operation?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BOMComponentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitOfMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    scrapFactor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    operation?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentPart?: PartUpdateOneRequiredWithoutParentBOMsNestedInput
    childPart?: PartUpdateOneRequiredWithoutChildBOMsNestedInput
  }

  export type BOMComponentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    parentPartId?: StringFieldUpdateOperationsInput | string
    childPartId?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitOfMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    scrapFactor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    operation?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BOMComponentCreateManyInput = {
    id?: string
    parentPartId: string
    childPartId: string
    quantity: Decimal | DecimalJsLike | number | string
    unitOfMeasure?: string | null
    scrapFactor?: Decimal | DecimalJsLike | number | string | null
    operation?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BOMComponentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitOfMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    scrapFactor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    operation?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BOMComponentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    parentPartId?: StringFieldUpdateOperationsInput | string
    childPartId?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitOfMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    scrapFactor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    operation?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderLineItemCreateInput = {
    id?: string
    quantity: number
    unitPrice?: Decimal | DecimalJsLike | number | string | null
    dueDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    purchaseOrder: PurchaseOrderCreateNestedOneWithoutLineItemsInput
    part: PartCreateNestedOneWithoutOrderLineItemsInput
    fileAttachments?: FileAttachmentCreateNestedManyWithoutLineItemInput
    batches?: BatchCreateNestedManyWithoutLineItemInput
  }

  export type OrderLineItemUncheckedCreateInput = {
    id?: string
    orderId: string
    partId: string
    quantity: number
    unitPrice?: Decimal | DecimalJsLike | number | string | null
    dueDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fileAttachments?: FileAttachmentUncheckedCreateNestedManyWithoutLineItemInput
    batches?: BatchUncheckedCreateNestedManyWithoutLineItemInput
  }

  export type OrderLineItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchaseOrder?: PurchaseOrderUpdateOneRequiredWithoutLineItemsNestedInput
    part?: PartUpdateOneRequiredWithoutOrderLineItemsNestedInput
    fileAttachments?: FileAttachmentUpdateManyWithoutLineItemNestedInput
    batches?: BatchUpdateManyWithoutLineItemNestedInput
  }

  export type OrderLineItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
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
    partId: string
    quantity: number
    unitPrice?: Decimal | DecimalJsLike | number | string | null
    dueDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderLineItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderLineItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileAttachmentCreateInput = {
    id?: string
    fileName: string
    storedFileName: string
    filePath: string
    fileType: string
    mimeType: string
    fileSize: number
    uploadedBy: string
    description?: string | null
    createdAt?: Date | string
    lineItem: OrderLineItemCreateNestedOneWithoutFileAttachmentsInput
  }

  export type FileAttachmentUncheckedCreateInput = {
    id?: string
    lineItemId: string
    fileName: string
    storedFileName: string
    filePath: string
    fileType: string
    mimeType: string
    fileSize: number
    uploadedBy: string
    description?: string | null
    createdAt?: Date | string
  }

  export type FileAttachmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    storedFileName?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    uploadedBy?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lineItem?: OrderLineItemUpdateOneRequiredWithoutFileAttachmentsNestedInput
  }

  export type FileAttachmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    lineItemId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    storedFileName?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    uploadedBy?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileAttachmentCreateManyInput = {
    id?: string
    lineItemId: string
    fileName: string
    storedFileName: string
    filePath: string
    fileType: string
    mimeType: string
    fileSize: number
    uploadedBy: string
    description?: string | null
    createdAt?: Date | string
  }

  export type FileAttachmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    storedFileName?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    uploadedBy?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileAttachmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    lineItemId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    storedFileName?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
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
    materialConsumption?: MaterialConsumptionCreateNestedManyWithoutBatchInput
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
    materialConsumption?: MaterialConsumptionUncheckedCreateNestedManyWithoutBatchInput
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
    materialConsumption?: MaterialConsumptionUpdateManyWithoutBatchNestedInput
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
    materialConsumption?: MaterialConsumptionUncheckedUpdateManyWithoutBatchNestedInput
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

  export type MaterialConsumptionCreateInput = {
    id?: string
    quantityUsed: Decimal | DecimalJsLike | number | string
    unitCost?: Decimal | DecimalJsLike | number | string | null
    consumedAt?: Date | string
    operatorId?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    batch: BatchCreateNestedOneWithoutMaterialConsumptionInput
    materialPart: PartCreateNestedOneWithoutMaterialConsumptionsInput
  }

  export type MaterialConsumptionUncheckedCreateInput = {
    id?: string
    batchId: string
    materialPartId: string
    quantityUsed: Decimal | DecimalJsLike | number | string
    unitCost?: Decimal | DecimalJsLike | number | string | null
    consumedAt?: Date | string
    operatorId?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MaterialConsumptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantityUsed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    consumedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    batch?: BatchUpdateOneRequiredWithoutMaterialConsumptionNestedInput
    materialPart?: PartUpdateOneRequiredWithoutMaterialConsumptionsNestedInput
  }

  export type MaterialConsumptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    materialPartId?: StringFieldUpdateOperationsInput | string
    quantityUsed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    consumedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaterialConsumptionCreateManyInput = {
    id?: string
    batchId: string
    materialPartId: string
    quantityUsed: Decimal | DecimalJsLike | number | string
    unitCost?: Decimal | DecimalJsLike | number | string | null
    consumedAt?: Date | string
    operatorId?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MaterialConsumptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantityUsed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    consumedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaterialConsumptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    materialPartId?: StringFieldUpdateOperationsInput | string
    quantityUsed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    consumedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type EnumPartTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PartType | EnumPartTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PartType[] | ListEnumPartTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PartType[] | ListEnumPartTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPartTypeFilter<$PrismaModel> | $Enums.PartType
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type BOMComponentListRelationFilter = {
    every?: BOMComponentWhereInput
    some?: BOMComponentWhereInput
    none?: BOMComponentWhereInput
  }

  export type MaterialConsumptionListRelationFilter = {
    every?: MaterialConsumptionWhereInput
    some?: MaterialConsumptionWhereInput
    none?: MaterialConsumptionWhereInput
  }

  export type BOMComponentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MaterialConsumptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PartCountOrderByAggregateInput = {
    id?: SortOrder
    partNumber?: SortOrder
    partName?: SortOrder
    partType?: SortOrder
    drawingNumber?: SortOrder
    revisionLevel?: SortOrder
    description?: SortOrder
    materialSpec?: SortOrder
    unitOfMeasure?: SortOrder
    standardCost?: SortOrder
    leadTime?: SortOrder
    active?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartAvgOrderByAggregateInput = {
    standardCost?: SortOrder
    leadTime?: SortOrder
  }

  export type PartMaxOrderByAggregateInput = {
    id?: SortOrder
    partNumber?: SortOrder
    partName?: SortOrder
    partType?: SortOrder
    drawingNumber?: SortOrder
    revisionLevel?: SortOrder
    description?: SortOrder
    materialSpec?: SortOrder
    unitOfMeasure?: SortOrder
    standardCost?: SortOrder
    leadTime?: SortOrder
    active?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartMinOrderByAggregateInput = {
    id?: SortOrder
    partNumber?: SortOrder
    partName?: SortOrder
    partType?: SortOrder
    drawingNumber?: SortOrder
    revisionLevel?: SortOrder
    description?: SortOrder
    materialSpec?: SortOrder
    unitOfMeasure?: SortOrder
    standardCost?: SortOrder
    leadTime?: SortOrder
    active?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartSumOrderByAggregateInput = {
    standardCost?: SortOrder
    leadTime?: SortOrder
  }

  export type EnumPartTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PartType | EnumPartTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PartType[] | ListEnumPartTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PartType[] | ListEnumPartTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPartTypeWithAggregatesFilter<$PrismaModel> | $Enums.PartType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPartTypeFilter<$PrismaModel>
    _max?: NestedEnumPartTypeFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type PartScalarRelationFilter = {
    is?: PartWhereInput
    isNot?: PartWhereInput
  }

  export type BOMComponentParentPartIdChildPartIdCompoundUniqueInput = {
    parentPartId: string
    childPartId: string
  }

  export type BOMComponentCountOrderByAggregateInput = {
    id?: SortOrder
    parentPartId?: SortOrder
    childPartId?: SortOrder
    quantity?: SortOrder
    unitOfMeasure?: SortOrder
    scrapFactor?: SortOrder
    operation?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BOMComponentAvgOrderByAggregateInput = {
    quantity?: SortOrder
    scrapFactor?: SortOrder
  }

  export type BOMComponentMaxOrderByAggregateInput = {
    id?: SortOrder
    parentPartId?: SortOrder
    childPartId?: SortOrder
    quantity?: SortOrder
    unitOfMeasure?: SortOrder
    scrapFactor?: SortOrder
    operation?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BOMComponentMinOrderByAggregateInput = {
    id?: SortOrder
    parentPartId?: SortOrder
    childPartId?: SortOrder
    quantity?: SortOrder
    unitOfMeasure?: SortOrder
    scrapFactor?: SortOrder
    operation?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BOMComponentSumOrderByAggregateInput = {
    quantity?: SortOrder
    scrapFactor?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
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
    partId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    dueDate?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderLineItemAvgOrderByAggregateInput = {
    quantity?: SortOrder
    unitPrice?: SortOrder
  }

  export type OrderLineItemMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    partId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    dueDate?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderLineItemMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    partId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    dueDate?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderLineItemSumOrderByAggregateInput = {
    quantity?: SortOrder
    unitPrice?: SortOrder
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
    storedFileName?: SortOrder
    filePath?: SortOrder
    fileType?: SortOrder
    mimeType?: SortOrder
    fileSize?: SortOrder
    uploadedBy?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type FileAttachmentAvgOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type FileAttachmentMaxOrderByAggregateInput = {
    id?: SortOrder
    lineItemId?: SortOrder
    fileName?: SortOrder
    storedFileName?: SortOrder
    filePath?: SortOrder
    fileType?: SortOrder
    mimeType?: SortOrder
    fileSize?: SortOrder
    uploadedBy?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type FileAttachmentMinOrderByAggregateInput = {
    id?: SortOrder
    lineItemId?: SortOrder
    fileName?: SortOrder
    storedFileName?: SortOrder
    filePath?: SortOrder
    fileType?: SortOrder
    mimeType?: SortOrder
    fileSize?: SortOrder
    uploadedBy?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type FileAttachmentSumOrderByAggregateInput = {
    fileSize?: SortOrder
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

  export type BatchScalarRelationFilter = {
    is?: BatchWhereInput
    isNot?: BatchWhereInput
  }

  export type MaterialConsumptionBatchIdMaterialPartIdCompoundUniqueInput = {
    batchId: string
    materialPartId: string
  }

  export type MaterialConsumptionCountOrderByAggregateInput = {
    id?: SortOrder
    batchId?: SortOrder
    materialPartId?: SortOrder
    quantityUsed?: SortOrder
    unitCost?: SortOrder
    consumedAt?: SortOrder
    operatorId?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MaterialConsumptionAvgOrderByAggregateInput = {
    quantityUsed?: SortOrder
    unitCost?: SortOrder
  }

  export type MaterialConsumptionMaxOrderByAggregateInput = {
    id?: SortOrder
    batchId?: SortOrder
    materialPartId?: SortOrder
    quantityUsed?: SortOrder
    unitCost?: SortOrder
    consumedAt?: SortOrder
    operatorId?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MaterialConsumptionMinOrderByAggregateInput = {
    id?: SortOrder
    batchId?: SortOrder
    materialPartId?: SortOrder
    quantityUsed?: SortOrder
    unitCost?: SortOrder
    consumedAt?: SortOrder
    operatorId?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MaterialConsumptionSumOrderByAggregateInput = {
    quantityUsed?: SortOrder
    unitCost?: SortOrder
  }

  export type EnumStepStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StepStatus | EnumStepStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StepStatus[] | ListEnumStepStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StepStatus[] | ListEnumStepStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStepStatusFilter<$PrismaModel> | $Enums.StepStatus
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

  export type BOMComponentCreateNestedManyWithoutParentPartInput = {
    create?: XOR<BOMComponentCreateWithoutParentPartInput, BOMComponentUncheckedCreateWithoutParentPartInput> | BOMComponentCreateWithoutParentPartInput[] | BOMComponentUncheckedCreateWithoutParentPartInput[]
    connectOrCreate?: BOMComponentCreateOrConnectWithoutParentPartInput | BOMComponentCreateOrConnectWithoutParentPartInput[]
    createMany?: BOMComponentCreateManyParentPartInputEnvelope
    connect?: BOMComponentWhereUniqueInput | BOMComponentWhereUniqueInput[]
  }

  export type BOMComponentCreateNestedManyWithoutChildPartInput = {
    create?: XOR<BOMComponentCreateWithoutChildPartInput, BOMComponentUncheckedCreateWithoutChildPartInput> | BOMComponentCreateWithoutChildPartInput[] | BOMComponentUncheckedCreateWithoutChildPartInput[]
    connectOrCreate?: BOMComponentCreateOrConnectWithoutChildPartInput | BOMComponentCreateOrConnectWithoutChildPartInput[]
    createMany?: BOMComponentCreateManyChildPartInputEnvelope
    connect?: BOMComponentWhereUniqueInput | BOMComponentWhereUniqueInput[]
  }

  export type OrderLineItemCreateNestedManyWithoutPartInput = {
    create?: XOR<OrderLineItemCreateWithoutPartInput, OrderLineItemUncheckedCreateWithoutPartInput> | OrderLineItemCreateWithoutPartInput[] | OrderLineItemUncheckedCreateWithoutPartInput[]
    connectOrCreate?: OrderLineItemCreateOrConnectWithoutPartInput | OrderLineItemCreateOrConnectWithoutPartInput[]
    createMany?: OrderLineItemCreateManyPartInputEnvelope
    connect?: OrderLineItemWhereUniqueInput | OrderLineItemWhereUniqueInput[]
  }

  export type MaterialConsumptionCreateNestedManyWithoutMaterialPartInput = {
    create?: XOR<MaterialConsumptionCreateWithoutMaterialPartInput, MaterialConsumptionUncheckedCreateWithoutMaterialPartInput> | MaterialConsumptionCreateWithoutMaterialPartInput[] | MaterialConsumptionUncheckedCreateWithoutMaterialPartInput[]
    connectOrCreate?: MaterialConsumptionCreateOrConnectWithoutMaterialPartInput | MaterialConsumptionCreateOrConnectWithoutMaterialPartInput[]
    createMany?: MaterialConsumptionCreateManyMaterialPartInputEnvelope
    connect?: MaterialConsumptionWhereUniqueInput | MaterialConsumptionWhereUniqueInput[]
  }

  export type BOMComponentUncheckedCreateNestedManyWithoutParentPartInput = {
    create?: XOR<BOMComponentCreateWithoutParentPartInput, BOMComponentUncheckedCreateWithoutParentPartInput> | BOMComponentCreateWithoutParentPartInput[] | BOMComponentUncheckedCreateWithoutParentPartInput[]
    connectOrCreate?: BOMComponentCreateOrConnectWithoutParentPartInput | BOMComponentCreateOrConnectWithoutParentPartInput[]
    createMany?: BOMComponentCreateManyParentPartInputEnvelope
    connect?: BOMComponentWhereUniqueInput | BOMComponentWhereUniqueInput[]
  }

  export type BOMComponentUncheckedCreateNestedManyWithoutChildPartInput = {
    create?: XOR<BOMComponentCreateWithoutChildPartInput, BOMComponentUncheckedCreateWithoutChildPartInput> | BOMComponentCreateWithoutChildPartInput[] | BOMComponentUncheckedCreateWithoutChildPartInput[]
    connectOrCreate?: BOMComponentCreateOrConnectWithoutChildPartInput | BOMComponentCreateOrConnectWithoutChildPartInput[]
    createMany?: BOMComponentCreateManyChildPartInputEnvelope
    connect?: BOMComponentWhereUniqueInput | BOMComponentWhereUniqueInput[]
  }

  export type OrderLineItemUncheckedCreateNestedManyWithoutPartInput = {
    create?: XOR<OrderLineItemCreateWithoutPartInput, OrderLineItemUncheckedCreateWithoutPartInput> | OrderLineItemCreateWithoutPartInput[] | OrderLineItemUncheckedCreateWithoutPartInput[]
    connectOrCreate?: OrderLineItemCreateOrConnectWithoutPartInput | OrderLineItemCreateOrConnectWithoutPartInput[]
    createMany?: OrderLineItemCreateManyPartInputEnvelope
    connect?: OrderLineItemWhereUniqueInput | OrderLineItemWhereUniqueInput[]
  }

  export type MaterialConsumptionUncheckedCreateNestedManyWithoutMaterialPartInput = {
    create?: XOR<MaterialConsumptionCreateWithoutMaterialPartInput, MaterialConsumptionUncheckedCreateWithoutMaterialPartInput> | MaterialConsumptionCreateWithoutMaterialPartInput[] | MaterialConsumptionUncheckedCreateWithoutMaterialPartInput[]
    connectOrCreate?: MaterialConsumptionCreateOrConnectWithoutMaterialPartInput | MaterialConsumptionCreateOrConnectWithoutMaterialPartInput[]
    createMany?: MaterialConsumptionCreateManyMaterialPartInputEnvelope
    connect?: MaterialConsumptionWhereUniqueInput | MaterialConsumptionWhereUniqueInput[]
  }

  export type EnumPartTypeFieldUpdateOperationsInput = {
    set?: $Enums.PartType
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type BOMComponentUpdateManyWithoutParentPartNestedInput = {
    create?: XOR<BOMComponentCreateWithoutParentPartInput, BOMComponentUncheckedCreateWithoutParentPartInput> | BOMComponentCreateWithoutParentPartInput[] | BOMComponentUncheckedCreateWithoutParentPartInput[]
    connectOrCreate?: BOMComponentCreateOrConnectWithoutParentPartInput | BOMComponentCreateOrConnectWithoutParentPartInput[]
    upsert?: BOMComponentUpsertWithWhereUniqueWithoutParentPartInput | BOMComponentUpsertWithWhereUniqueWithoutParentPartInput[]
    createMany?: BOMComponentCreateManyParentPartInputEnvelope
    set?: BOMComponentWhereUniqueInput | BOMComponentWhereUniqueInput[]
    disconnect?: BOMComponentWhereUniqueInput | BOMComponentWhereUniqueInput[]
    delete?: BOMComponentWhereUniqueInput | BOMComponentWhereUniqueInput[]
    connect?: BOMComponentWhereUniqueInput | BOMComponentWhereUniqueInput[]
    update?: BOMComponentUpdateWithWhereUniqueWithoutParentPartInput | BOMComponentUpdateWithWhereUniqueWithoutParentPartInput[]
    updateMany?: BOMComponentUpdateManyWithWhereWithoutParentPartInput | BOMComponentUpdateManyWithWhereWithoutParentPartInput[]
    deleteMany?: BOMComponentScalarWhereInput | BOMComponentScalarWhereInput[]
  }

  export type BOMComponentUpdateManyWithoutChildPartNestedInput = {
    create?: XOR<BOMComponentCreateWithoutChildPartInput, BOMComponentUncheckedCreateWithoutChildPartInput> | BOMComponentCreateWithoutChildPartInput[] | BOMComponentUncheckedCreateWithoutChildPartInput[]
    connectOrCreate?: BOMComponentCreateOrConnectWithoutChildPartInput | BOMComponentCreateOrConnectWithoutChildPartInput[]
    upsert?: BOMComponentUpsertWithWhereUniqueWithoutChildPartInput | BOMComponentUpsertWithWhereUniqueWithoutChildPartInput[]
    createMany?: BOMComponentCreateManyChildPartInputEnvelope
    set?: BOMComponentWhereUniqueInput | BOMComponentWhereUniqueInput[]
    disconnect?: BOMComponentWhereUniqueInput | BOMComponentWhereUniqueInput[]
    delete?: BOMComponentWhereUniqueInput | BOMComponentWhereUniqueInput[]
    connect?: BOMComponentWhereUniqueInput | BOMComponentWhereUniqueInput[]
    update?: BOMComponentUpdateWithWhereUniqueWithoutChildPartInput | BOMComponentUpdateWithWhereUniqueWithoutChildPartInput[]
    updateMany?: BOMComponentUpdateManyWithWhereWithoutChildPartInput | BOMComponentUpdateManyWithWhereWithoutChildPartInput[]
    deleteMany?: BOMComponentScalarWhereInput | BOMComponentScalarWhereInput[]
  }

  export type OrderLineItemUpdateManyWithoutPartNestedInput = {
    create?: XOR<OrderLineItemCreateWithoutPartInput, OrderLineItemUncheckedCreateWithoutPartInput> | OrderLineItemCreateWithoutPartInput[] | OrderLineItemUncheckedCreateWithoutPartInput[]
    connectOrCreate?: OrderLineItemCreateOrConnectWithoutPartInput | OrderLineItemCreateOrConnectWithoutPartInput[]
    upsert?: OrderLineItemUpsertWithWhereUniqueWithoutPartInput | OrderLineItemUpsertWithWhereUniqueWithoutPartInput[]
    createMany?: OrderLineItemCreateManyPartInputEnvelope
    set?: OrderLineItemWhereUniqueInput | OrderLineItemWhereUniqueInput[]
    disconnect?: OrderLineItemWhereUniqueInput | OrderLineItemWhereUniqueInput[]
    delete?: OrderLineItemWhereUniqueInput | OrderLineItemWhereUniqueInput[]
    connect?: OrderLineItemWhereUniqueInput | OrderLineItemWhereUniqueInput[]
    update?: OrderLineItemUpdateWithWhereUniqueWithoutPartInput | OrderLineItemUpdateWithWhereUniqueWithoutPartInput[]
    updateMany?: OrderLineItemUpdateManyWithWhereWithoutPartInput | OrderLineItemUpdateManyWithWhereWithoutPartInput[]
    deleteMany?: OrderLineItemScalarWhereInput | OrderLineItemScalarWhereInput[]
  }

  export type MaterialConsumptionUpdateManyWithoutMaterialPartNestedInput = {
    create?: XOR<MaterialConsumptionCreateWithoutMaterialPartInput, MaterialConsumptionUncheckedCreateWithoutMaterialPartInput> | MaterialConsumptionCreateWithoutMaterialPartInput[] | MaterialConsumptionUncheckedCreateWithoutMaterialPartInput[]
    connectOrCreate?: MaterialConsumptionCreateOrConnectWithoutMaterialPartInput | MaterialConsumptionCreateOrConnectWithoutMaterialPartInput[]
    upsert?: MaterialConsumptionUpsertWithWhereUniqueWithoutMaterialPartInput | MaterialConsumptionUpsertWithWhereUniqueWithoutMaterialPartInput[]
    createMany?: MaterialConsumptionCreateManyMaterialPartInputEnvelope
    set?: MaterialConsumptionWhereUniqueInput | MaterialConsumptionWhereUniqueInput[]
    disconnect?: MaterialConsumptionWhereUniqueInput | MaterialConsumptionWhereUniqueInput[]
    delete?: MaterialConsumptionWhereUniqueInput | MaterialConsumptionWhereUniqueInput[]
    connect?: MaterialConsumptionWhereUniqueInput | MaterialConsumptionWhereUniqueInput[]
    update?: MaterialConsumptionUpdateWithWhereUniqueWithoutMaterialPartInput | MaterialConsumptionUpdateWithWhereUniqueWithoutMaterialPartInput[]
    updateMany?: MaterialConsumptionUpdateManyWithWhereWithoutMaterialPartInput | MaterialConsumptionUpdateManyWithWhereWithoutMaterialPartInput[]
    deleteMany?: MaterialConsumptionScalarWhereInput | MaterialConsumptionScalarWhereInput[]
  }

  export type BOMComponentUncheckedUpdateManyWithoutParentPartNestedInput = {
    create?: XOR<BOMComponentCreateWithoutParentPartInput, BOMComponentUncheckedCreateWithoutParentPartInput> | BOMComponentCreateWithoutParentPartInput[] | BOMComponentUncheckedCreateWithoutParentPartInput[]
    connectOrCreate?: BOMComponentCreateOrConnectWithoutParentPartInput | BOMComponentCreateOrConnectWithoutParentPartInput[]
    upsert?: BOMComponentUpsertWithWhereUniqueWithoutParentPartInput | BOMComponentUpsertWithWhereUniqueWithoutParentPartInput[]
    createMany?: BOMComponentCreateManyParentPartInputEnvelope
    set?: BOMComponentWhereUniqueInput | BOMComponentWhereUniqueInput[]
    disconnect?: BOMComponentWhereUniqueInput | BOMComponentWhereUniqueInput[]
    delete?: BOMComponentWhereUniqueInput | BOMComponentWhereUniqueInput[]
    connect?: BOMComponentWhereUniqueInput | BOMComponentWhereUniqueInput[]
    update?: BOMComponentUpdateWithWhereUniqueWithoutParentPartInput | BOMComponentUpdateWithWhereUniqueWithoutParentPartInput[]
    updateMany?: BOMComponentUpdateManyWithWhereWithoutParentPartInput | BOMComponentUpdateManyWithWhereWithoutParentPartInput[]
    deleteMany?: BOMComponentScalarWhereInput | BOMComponentScalarWhereInput[]
  }

  export type BOMComponentUncheckedUpdateManyWithoutChildPartNestedInput = {
    create?: XOR<BOMComponentCreateWithoutChildPartInput, BOMComponentUncheckedCreateWithoutChildPartInput> | BOMComponentCreateWithoutChildPartInput[] | BOMComponentUncheckedCreateWithoutChildPartInput[]
    connectOrCreate?: BOMComponentCreateOrConnectWithoutChildPartInput | BOMComponentCreateOrConnectWithoutChildPartInput[]
    upsert?: BOMComponentUpsertWithWhereUniqueWithoutChildPartInput | BOMComponentUpsertWithWhereUniqueWithoutChildPartInput[]
    createMany?: BOMComponentCreateManyChildPartInputEnvelope
    set?: BOMComponentWhereUniqueInput | BOMComponentWhereUniqueInput[]
    disconnect?: BOMComponentWhereUniqueInput | BOMComponentWhereUniqueInput[]
    delete?: BOMComponentWhereUniqueInput | BOMComponentWhereUniqueInput[]
    connect?: BOMComponentWhereUniqueInput | BOMComponentWhereUniqueInput[]
    update?: BOMComponentUpdateWithWhereUniqueWithoutChildPartInput | BOMComponentUpdateWithWhereUniqueWithoutChildPartInput[]
    updateMany?: BOMComponentUpdateManyWithWhereWithoutChildPartInput | BOMComponentUpdateManyWithWhereWithoutChildPartInput[]
    deleteMany?: BOMComponentScalarWhereInput | BOMComponentScalarWhereInput[]
  }

  export type OrderLineItemUncheckedUpdateManyWithoutPartNestedInput = {
    create?: XOR<OrderLineItemCreateWithoutPartInput, OrderLineItemUncheckedCreateWithoutPartInput> | OrderLineItemCreateWithoutPartInput[] | OrderLineItemUncheckedCreateWithoutPartInput[]
    connectOrCreate?: OrderLineItemCreateOrConnectWithoutPartInput | OrderLineItemCreateOrConnectWithoutPartInput[]
    upsert?: OrderLineItemUpsertWithWhereUniqueWithoutPartInput | OrderLineItemUpsertWithWhereUniqueWithoutPartInput[]
    createMany?: OrderLineItemCreateManyPartInputEnvelope
    set?: OrderLineItemWhereUniqueInput | OrderLineItemWhereUniqueInput[]
    disconnect?: OrderLineItemWhereUniqueInput | OrderLineItemWhereUniqueInput[]
    delete?: OrderLineItemWhereUniqueInput | OrderLineItemWhereUniqueInput[]
    connect?: OrderLineItemWhereUniqueInput | OrderLineItemWhereUniqueInput[]
    update?: OrderLineItemUpdateWithWhereUniqueWithoutPartInput | OrderLineItemUpdateWithWhereUniqueWithoutPartInput[]
    updateMany?: OrderLineItemUpdateManyWithWhereWithoutPartInput | OrderLineItemUpdateManyWithWhereWithoutPartInput[]
    deleteMany?: OrderLineItemScalarWhereInput | OrderLineItemScalarWhereInput[]
  }

  export type MaterialConsumptionUncheckedUpdateManyWithoutMaterialPartNestedInput = {
    create?: XOR<MaterialConsumptionCreateWithoutMaterialPartInput, MaterialConsumptionUncheckedCreateWithoutMaterialPartInput> | MaterialConsumptionCreateWithoutMaterialPartInput[] | MaterialConsumptionUncheckedCreateWithoutMaterialPartInput[]
    connectOrCreate?: MaterialConsumptionCreateOrConnectWithoutMaterialPartInput | MaterialConsumptionCreateOrConnectWithoutMaterialPartInput[]
    upsert?: MaterialConsumptionUpsertWithWhereUniqueWithoutMaterialPartInput | MaterialConsumptionUpsertWithWhereUniqueWithoutMaterialPartInput[]
    createMany?: MaterialConsumptionCreateManyMaterialPartInputEnvelope
    set?: MaterialConsumptionWhereUniqueInput | MaterialConsumptionWhereUniqueInput[]
    disconnect?: MaterialConsumptionWhereUniqueInput | MaterialConsumptionWhereUniqueInput[]
    delete?: MaterialConsumptionWhereUniqueInput | MaterialConsumptionWhereUniqueInput[]
    connect?: MaterialConsumptionWhereUniqueInput | MaterialConsumptionWhereUniqueInput[]
    update?: MaterialConsumptionUpdateWithWhereUniqueWithoutMaterialPartInput | MaterialConsumptionUpdateWithWhereUniqueWithoutMaterialPartInput[]
    updateMany?: MaterialConsumptionUpdateManyWithWhereWithoutMaterialPartInput | MaterialConsumptionUpdateManyWithWhereWithoutMaterialPartInput[]
    deleteMany?: MaterialConsumptionScalarWhereInput | MaterialConsumptionScalarWhereInput[]
  }

  export type PartCreateNestedOneWithoutParentBOMsInput = {
    create?: XOR<PartCreateWithoutParentBOMsInput, PartUncheckedCreateWithoutParentBOMsInput>
    connectOrCreate?: PartCreateOrConnectWithoutParentBOMsInput
    connect?: PartWhereUniqueInput
  }

  export type PartCreateNestedOneWithoutChildBOMsInput = {
    create?: XOR<PartCreateWithoutChildBOMsInput, PartUncheckedCreateWithoutChildBOMsInput>
    connectOrCreate?: PartCreateOrConnectWithoutChildBOMsInput
    connect?: PartWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type PartUpdateOneRequiredWithoutParentBOMsNestedInput = {
    create?: XOR<PartCreateWithoutParentBOMsInput, PartUncheckedCreateWithoutParentBOMsInput>
    connectOrCreate?: PartCreateOrConnectWithoutParentBOMsInput
    upsert?: PartUpsertWithoutParentBOMsInput
    connect?: PartWhereUniqueInput
    update?: XOR<XOR<PartUpdateToOneWithWhereWithoutParentBOMsInput, PartUpdateWithoutParentBOMsInput>, PartUncheckedUpdateWithoutParentBOMsInput>
  }

  export type PartUpdateOneRequiredWithoutChildBOMsNestedInput = {
    create?: XOR<PartCreateWithoutChildBOMsInput, PartUncheckedCreateWithoutChildBOMsInput>
    connectOrCreate?: PartCreateOrConnectWithoutChildBOMsInput
    upsert?: PartUpsertWithoutChildBOMsInput
    connect?: PartWhereUniqueInput
    update?: XOR<XOR<PartUpdateToOneWithWhereWithoutChildBOMsInput, PartUpdateWithoutChildBOMsInput>, PartUncheckedUpdateWithoutChildBOMsInput>
  }

  export type PurchaseOrderCreateNestedOneWithoutLineItemsInput = {
    create?: XOR<PurchaseOrderCreateWithoutLineItemsInput, PurchaseOrderUncheckedCreateWithoutLineItemsInput>
    connectOrCreate?: PurchaseOrderCreateOrConnectWithoutLineItemsInput
    connect?: PurchaseOrderWhereUniqueInput
  }

  export type PartCreateNestedOneWithoutOrderLineItemsInput = {
    create?: XOR<PartCreateWithoutOrderLineItemsInput, PartUncheckedCreateWithoutOrderLineItemsInput>
    connectOrCreate?: PartCreateOrConnectWithoutOrderLineItemsInput
    connect?: PartWhereUniqueInput
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

  export type PartUpdateOneRequiredWithoutOrderLineItemsNestedInput = {
    create?: XOR<PartCreateWithoutOrderLineItemsInput, PartUncheckedCreateWithoutOrderLineItemsInput>
    connectOrCreate?: PartCreateOrConnectWithoutOrderLineItemsInput
    upsert?: PartUpsertWithoutOrderLineItemsInput
    connect?: PartWhereUniqueInput
    update?: XOR<XOR<PartUpdateToOneWithWhereWithoutOrderLineItemsInput, PartUpdateWithoutOrderLineItemsInput>, PartUncheckedUpdateWithoutOrderLineItemsInput>
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

  export type MaterialConsumptionCreateNestedManyWithoutBatchInput = {
    create?: XOR<MaterialConsumptionCreateWithoutBatchInput, MaterialConsumptionUncheckedCreateWithoutBatchInput> | MaterialConsumptionCreateWithoutBatchInput[] | MaterialConsumptionUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: MaterialConsumptionCreateOrConnectWithoutBatchInput | MaterialConsumptionCreateOrConnectWithoutBatchInput[]
    createMany?: MaterialConsumptionCreateManyBatchInputEnvelope
    connect?: MaterialConsumptionWhereUniqueInput | MaterialConsumptionWhereUniqueInput[]
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

  export type MaterialConsumptionUncheckedCreateNestedManyWithoutBatchInput = {
    create?: XOR<MaterialConsumptionCreateWithoutBatchInput, MaterialConsumptionUncheckedCreateWithoutBatchInput> | MaterialConsumptionCreateWithoutBatchInput[] | MaterialConsumptionUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: MaterialConsumptionCreateOrConnectWithoutBatchInput | MaterialConsumptionCreateOrConnectWithoutBatchInput[]
    createMany?: MaterialConsumptionCreateManyBatchInputEnvelope
    connect?: MaterialConsumptionWhereUniqueInput | MaterialConsumptionWhereUniqueInput[]
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

  export type MaterialConsumptionUpdateManyWithoutBatchNestedInput = {
    create?: XOR<MaterialConsumptionCreateWithoutBatchInput, MaterialConsumptionUncheckedCreateWithoutBatchInput> | MaterialConsumptionCreateWithoutBatchInput[] | MaterialConsumptionUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: MaterialConsumptionCreateOrConnectWithoutBatchInput | MaterialConsumptionCreateOrConnectWithoutBatchInput[]
    upsert?: MaterialConsumptionUpsertWithWhereUniqueWithoutBatchInput | MaterialConsumptionUpsertWithWhereUniqueWithoutBatchInput[]
    createMany?: MaterialConsumptionCreateManyBatchInputEnvelope
    set?: MaterialConsumptionWhereUniqueInput | MaterialConsumptionWhereUniqueInput[]
    disconnect?: MaterialConsumptionWhereUniqueInput | MaterialConsumptionWhereUniqueInput[]
    delete?: MaterialConsumptionWhereUniqueInput | MaterialConsumptionWhereUniqueInput[]
    connect?: MaterialConsumptionWhereUniqueInput | MaterialConsumptionWhereUniqueInput[]
    update?: MaterialConsumptionUpdateWithWhereUniqueWithoutBatchInput | MaterialConsumptionUpdateWithWhereUniqueWithoutBatchInput[]
    updateMany?: MaterialConsumptionUpdateManyWithWhereWithoutBatchInput | MaterialConsumptionUpdateManyWithWhereWithoutBatchInput[]
    deleteMany?: MaterialConsumptionScalarWhereInput | MaterialConsumptionScalarWhereInput[]
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

  export type MaterialConsumptionUncheckedUpdateManyWithoutBatchNestedInput = {
    create?: XOR<MaterialConsumptionCreateWithoutBatchInput, MaterialConsumptionUncheckedCreateWithoutBatchInput> | MaterialConsumptionCreateWithoutBatchInput[] | MaterialConsumptionUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: MaterialConsumptionCreateOrConnectWithoutBatchInput | MaterialConsumptionCreateOrConnectWithoutBatchInput[]
    upsert?: MaterialConsumptionUpsertWithWhereUniqueWithoutBatchInput | MaterialConsumptionUpsertWithWhereUniqueWithoutBatchInput[]
    createMany?: MaterialConsumptionCreateManyBatchInputEnvelope
    set?: MaterialConsumptionWhereUniqueInput | MaterialConsumptionWhereUniqueInput[]
    disconnect?: MaterialConsumptionWhereUniqueInput | MaterialConsumptionWhereUniqueInput[]
    delete?: MaterialConsumptionWhereUniqueInput | MaterialConsumptionWhereUniqueInput[]
    connect?: MaterialConsumptionWhereUniqueInput | MaterialConsumptionWhereUniqueInput[]
    update?: MaterialConsumptionUpdateWithWhereUniqueWithoutBatchInput | MaterialConsumptionUpdateWithWhereUniqueWithoutBatchInput[]
    updateMany?: MaterialConsumptionUpdateManyWithWhereWithoutBatchInput | MaterialConsumptionUpdateManyWithWhereWithoutBatchInput[]
    deleteMany?: MaterialConsumptionScalarWhereInput | MaterialConsumptionScalarWhereInput[]
  }

  export type BatchCreateNestedOneWithoutMaterialConsumptionInput = {
    create?: XOR<BatchCreateWithoutMaterialConsumptionInput, BatchUncheckedCreateWithoutMaterialConsumptionInput>
    connectOrCreate?: BatchCreateOrConnectWithoutMaterialConsumptionInput
    connect?: BatchWhereUniqueInput
  }

  export type PartCreateNestedOneWithoutMaterialConsumptionsInput = {
    create?: XOR<PartCreateWithoutMaterialConsumptionsInput, PartUncheckedCreateWithoutMaterialConsumptionsInput>
    connectOrCreate?: PartCreateOrConnectWithoutMaterialConsumptionsInput
    connect?: PartWhereUniqueInput
  }

  export type BatchUpdateOneRequiredWithoutMaterialConsumptionNestedInput = {
    create?: XOR<BatchCreateWithoutMaterialConsumptionInput, BatchUncheckedCreateWithoutMaterialConsumptionInput>
    connectOrCreate?: BatchCreateOrConnectWithoutMaterialConsumptionInput
    upsert?: BatchUpsertWithoutMaterialConsumptionInput
    connect?: BatchWhereUniqueInput
    update?: XOR<XOR<BatchUpdateToOneWithWhereWithoutMaterialConsumptionInput, BatchUpdateWithoutMaterialConsumptionInput>, BatchUncheckedUpdateWithoutMaterialConsumptionInput>
  }

  export type PartUpdateOneRequiredWithoutMaterialConsumptionsNestedInput = {
    create?: XOR<PartCreateWithoutMaterialConsumptionsInput, PartUncheckedCreateWithoutMaterialConsumptionsInput>
    connectOrCreate?: PartCreateOrConnectWithoutMaterialConsumptionsInput
    upsert?: PartUpsertWithoutMaterialConsumptionsInput
    connect?: PartWhereUniqueInput
    update?: XOR<XOR<PartUpdateToOneWithWhereWithoutMaterialConsumptionsInput, PartUpdateWithoutMaterialConsumptionsInput>, PartUncheckedUpdateWithoutMaterialConsumptionsInput>
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

  export type NestedEnumPartTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PartType | EnumPartTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PartType[] | ListEnumPartTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PartType[] | ListEnumPartTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPartTypeFilter<$PrismaModel> | $Enums.PartType
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumPartTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PartType | EnumPartTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PartType[] | ListEnumPartTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PartType[] | ListEnumPartTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPartTypeWithAggregatesFilter<$PrismaModel> | $Enums.PartType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPartTypeFilter<$PrismaModel>
    _max?: NestedEnumPartTypeFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
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

  export type NestedEnumStepStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StepStatus | EnumStepStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StepStatus[] | ListEnumStepStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StepStatus[] | ListEnumStepStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStepStatusFilter<$PrismaModel> | $Enums.StepStatus
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
    quantity: number
    unitPrice?: Decimal | DecimalJsLike | number | string | null
    dueDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    part: PartCreateNestedOneWithoutOrderLineItemsInput
    fileAttachments?: FileAttachmentCreateNestedManyWithoutLineItemInput
    batches?: BatchCreateNestedManyWithoutLineItemInput
  }

  export type OrderLineItemUncheckedCreateWithoutPurchaseOrderInput = {
    id?: string
    partId: string
    quantity: number
    unitPrice?: Decimal | DecimalJsLike | number | string | null
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
    partId?: StringFilter<"OrderLineItem"> | string
    quantity?: IntFilter<"OrderLineItem"> | number
    unitPrice?: DecimalNullableFilter<"OrderLineItem"> | Decimal | DecimalJsLike | number | string | null
    dueDate?: DateTimeNullableFilter<"OrderLineItem"> | Date | string | null
    notes?: StringNullableFilter<"OrderLineItem"> | string | null
    createdAt?: DateTimeFilter<"OrderLineItem"> | Date | string
    updatedAt?: DateTimeFilter<"OrderLineItem"> | Date | string
  }

  export type BOMComponentCreateWithoutParentPartInput = {
    id?: string
    quantity: Decimal | DecimalJsLike | number | string
    unitOfMeasure?: string | null
    scrapFactor?: Decimal | DecimalJsLike | number | string | null
    operation?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    childPart: PartCreateNestedOneWithoutChildBOMsInput
  }

  export type BOMComponentUncheckedCreateWithoutParentPartInput = {
    id?: string
    childPartId: string
    quantity: Decimal | DecimalJsLike | number | string
    unitOfMeasure?: string | null
    scrapFactor?: Decimal | DecimalJsLike | number | string | null
    operation?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BOMComponentCreateOrConnectWithoutParentPartInput = {
    where: BOMComponentWhereUniqueInput
    create: XOR<BOMComponentCreateWithoutParentPartInput, BOMComponentUncheckedCreateWithoutParentPartInput>
  }

  export type BOMComponentCreateManyParentPartInputEnvelope = {
    data: BOMComponentCreateManyParentPartInput | BOMComponentCreateManyParentPartInput[]
    skipDuplicates?: boolean
  }

  export type BOMComponentCreateWithoutChildPartInput = {
    id?: string
    quantity: Decimal | DecimalJsLike | number | string
    unitOfMeasure?: string | null
    scrapFactor?: Decimal | DecimalJsLike | number | string | null
    operation?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parentPart: PartCreateNestedOneWithoutParentBOMsInput
  }

  export type BOMComponentUncheckedCreateWithoutChildPartInput = {
    id?: string
    parentPartId: string
    quantity: Decimal | DecimalJsLike | number | string
    unitOfMeasure?: string | null
    scrapFactor?: Decimal | DecimalJsLike | number | string | null
    operation?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BOMComponentCreateOrConnectWithoutChildPartInput = {
    where: BOMComponentWhereUniqueInput
    create: XOR<BOMComponentCreateWithoutChildPartInput, BOMComponentUncheckedCreateWithoutChildPartInput>
  }

  export type BOMComponentCreateManyChildPartInputEnvelope = {
    data: BOMComponentCreateManyChildPartInput | BOMComponentCreateManyChildPartInput[]
    skipDuplicates?: boolean
  }

  export type OrderLineItemCreateWithoutPartInput = {
    id?: string
    quantity: number
    unitPrice?: Decimal | DecimalJsLike | number | string | null
    dueDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    purchaseOrder: PurchaseOrderCreateNestedOneWithoutLineItemsInput
    fileAttachments?: FileAttachmentCreateNestedManyWithoutLineItemInput
    batches?: BatchCreateNestedManyWithoutLineItemInput
  }

  export type OrderLineItemUncheckedCreateWithoutPartInput = {
    id?: string
    orderId: string
    quantity: number
    unitPrice?: Decimal | DecimalJsLike | number | string | null
    dueDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fileAttachments?: FileAttachmentUncheckedCreateNestedManyWithoutLineItemInput
    batches?: BatchUncheckedCreateNestedManyWithoutLineItemInput
  }

  export type OrderLineItemCreateOrConnectWithoutPartInput = {
    where: OrderLineItemWhereUniqueInput
    create: XOR<OrderLineItemCreateWithoutPartInput, OrderLineItemUncheckedCreateWithoutPartInput>
  }

  export type OrderLineItemCreateManyPartInputEnvelope = {
    data: OrderLineItemCreateManyPartInput | OrderLineItemCreateManyPartInput[]
    skipDuplicates?: boolean
  }

  export type MaterialConsumptionCreateWithoutMaterialPartInput = {
    id?: string
    quantityUsed: Decimal | DecimalJsLike | number | string
    unitCost?: Decimal | DecimalJsLike | number | string | null
    consumedAt?: Date | string
    operatorId?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    batch: BatchCreateNestedOneWithoutMaterialConsumptionInput
  }

  export type MaterialConsumptionUncheckedCreateWithoutMaterialPartInput = {
    id?: string
    batchId: string
    quantityUsed: Decimal | DecimalJsLike | number | string
    unitCost?: Decimal | DecimalJsLike | number | string | null
    consumedAt?: Date | string
    operatorId?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MaterialConsumptionCreateOrConnectWithoutMaterialPartInput = {
    where: MaterialConsumptionWhereUniqueInput
    create: XOR<MaterialConsumptionCreateWithoutMaterialPartInput, MaterialConsumptionUncheckedCreateWithoutMaterialPartInput>
  }

  export type MaterialConsumptionCreateManyMaterialPartInputEnvelope = {
    data: MaterialConsumptionCreateManyMaterialPartInput | MaterialConsumptionCreateManyMaterialPartInput[]
    skipDuplicates?: boolean
  }

  export type BOMComponentUpsertWithWhereUniqueWithoutParentPartInput = {
    where: BOMComponentWhereUniqueInput
    update: XOR<BOMComponentUpdateWithoutParentPartInput, BOMComponentUncheckedUpdateWithoutParentPartInput>
    create: XOR<BOMComponentCreateWithoutParentPartInput, BOMComponentUncheckedCreateWithoutParentPartInput>
  }

  export type BOMComponentUpdateWithWhereUniqueWithoutParentPartInput = {
    where: BOMComponentWhereUniqueInput
    data: XOR<BOMComponentUpdateWithoutParentPartInput, BOMComponentUncheckedUpdateWithoutParentPartInput>
  }

  export type BOMComponentUpdateManyWithWhereWithoutParentPartInput = {
    where: BOMComponentScalarWhereInput
    data: XOR<BOMComponentUpdateManyMutationInput, BOMComponentUncheckedUpdateManyWithoutParentPartInput>
  }

  export type BOMComponentScalarWhereInput = {
    AND?: BOMComponentScalarWhereInput | BOMComponentScalarWhereInput[]
    OR?: BOMComponentScalarWhereInput[]
    NOT?: BOMComponentScalarWhereInput | BOMComponentScalarWhereInput[]
    id?: StringFilter<"BOMComponent"> | string
    parentPartId?: StringFilter<"BOMComponent"> | string
    childPartId?: StringFilter<"BOMComponent"> | string
    quantity?: DecimalFilter<"BOMComponent"> | Decimal | DecimalJsLike | number | string
    unitOfMeasure?: StringNullableFilter<"BOMComponent"> | string | null
    scrapFactor?: DecimalNullableFilter<"BOMComponent"> | Decimal | DecimalJsLike | number | string | null
    operation?: StringNullableFilter<"BOMComponent"> | string | null
    notes?: StringNullableFilter<"BOMComponent"> | string | null
    createdAt?: DateTimeFilter<"BOMComponent"> | Date | string
    updatedAt?: DateTimeFilter<"BOMComponent"> | Date | string
  }

  export type BOMComponentUpsertWithWhereUniqueWithoutChildPartInput = {
    where: BOMComponentWhereUniqueInput
    update: XOR<BOMComponentUpdateWithoutChildPartInput, BOMComponentUncheckedUpdateWithoutChildPartInput>
    create: XOR<BOMComponentCreateWithoutChildPartInput, BOMComponentUncheckedCreateWithoutChildPartInput>
  }

  export type BOMComponentUpdateWithWhereUniqueWithoutChildPartInput = {
    where: BOMComponentWhereUniqueInput
    data: XOR<BOMComponentUpdateWithoutChildPartInput, BOMComponentUncheckedUpdateWithoutChildPartInput>
  }

  export type BOMComponentUpdateManyWithWhereWithoutChildPartInput = {
    where: BOMComponentScalarWhereInput
    data: XOR<BOMComponentUpdateManyMutationInput, BOMComponentUncheckedUpdateManyWithoutChildPartInput>
  }

  export type OrderLineItemUpsertWithWhereUniqueWithoutPartInput = {
    where: OrderLineItemWhereUniqueInput
    update: XOR<OrderLineItemUpdateWithoutPartInput, OrderLineItemUncheckedUpdateWithoutPartInput>
    create: XOR<OrderLineItemCreateWithoutPartInput, OrderLineItemUncheckedCreateWithoutPartInput>
  }

  export type OrderLineItemUpdateWithWhereUniqueWithoutPartInput = {
    where: OrderLineItemWhereUniqueInput
    data: XOR<OrderLineItemUpdateWithoutPartInput, OrderLineItemUncheckedUpdateWithoutPartInput>
  }

  export type OrderLineItemUpdateManyWithWhereWithoutPartInput = {
    where: OrderLineItemScalarWhereInput
    data: XOR<OrderLineItemUpdateManyMutationInput, OrderLineItemUncheckedUpdateManyWithoutPartInput>
  }

  export type MaterialConsumptionUpsertWithWhereUniqueWithoutMaterialPartInput = {
    where: MaterialConsumptionWhereUniqueInput
    update: XOR<MaterialConsumptionUpdateWithoutMaterialPartInput, MaterialConsumptionUncheckedUpdateWithoutMaterialPartInput>
    create: XOR<MaterialConsumptionCreateWithoutMaterialPartInput, MaterialConsumptionUncheckedCreateWithoutMaterialPartInput>
  }

  export type MaterialConsumptionUpdateWithWhereUniqueWithoutMaterialPartInput = {
    where: MaterialConsumptionWhereUniqueInput
    data: XOR<MaterialConsumptionUpdateWithoutMaterialPartInput, MaterialConsumptionUncheckedUpdateWithoutMaterialPartInput>
  }

  export type MaterialConsumptionUpdateManyWithWhereWithoutMaterialPartInput = {
    where: MaterialConsumptionScalarWhereInput
    data: XOR<MaterialConsumptionUpdateManyMutationInput, MaterialConsumptionUncheckedUpdateManyWithoutMaterialPartInput>
  }

  export type MaterialConsumptionScalarWhereInput = {
    AND?: MaterialConsumptionScalarWhereInput | MaterialConsumptionScalarWhereInput[]
    OR?: MaterialConsumptionScalarWhereInput[]
    NOT?: MaterialConsumptionScalarWhereInput | MaterialConsumptionScalarWhereInput[]
    id?: StringFilter<"MaterialConsumption"> | string
    batchId?: StringFilter<"MaterialConsumption"> | string
    materialPartId?: StringFilter<"MaterialConsumption"> | string
    quantityUsed?: DecimalFilter<"MaterialConsumption"> | Decimal | DecimalJsLike | number | string
    unitCost?: DecimalNullableFilter<"MaterialConsumption"> | Decimal | DecimalJsLike | number | string | null
    consumedAt?: DateTimeFilter<"MaterialConsumption"> | Date | string
    operatorId?: StringNullableFilter<"MaterialConsumption"> | string | null
    notes?: StringNullableFilter<"MaterialConsumption"> | string | null
    createdAt?: DateTimeFilter<"MaterialConsumption"> | Date | string
    updatedAt?: DateTimeFilter<"MaterialConsumption"> | Date | string
  }

  export type PartCreateWithoutParentBOMsInput = {
    id?: string
    partNumber: string
    partName: string
    partType: $Enums.PartType
    drawingNumber?: string | null
    revisionLevel?: string | null
    description?: string | null
    materialSpec?: string | null
    unitOfMeasure?: string | null
    standardCost?: Decimal | DecimalJsLike | number | string | null
    leadTime?: number | null
    active?: boolean
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    childBOMs?: BOMComponentCreateNestedManyWithoutChildPartInput
    orderLineItems?: OrderLineItemCreateNestedManyWithoutPartInput
    materialConsumptions?: MaterialConsumptionCreateNestedManyWithoutMaterialPartInput
  }

  export type PartUncheckedCreateWithoutParentBOMsInput = {
    id?: string
    partNumber: string
    partName: string
    partType: $Enums.PartType
    drawingNumber?: string | null
    revisionLevel?: string | null
    description?: string | null
    materialSpec?: string | null
    unitOfMeasure?: string | null
    standardCost?: Decimal | DecimalJsLike | number | string | null
    leadTime?: number | null
    active?: boolean
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    childBOMs?: BOMComponentUncheckedCreateNestedManyWithoutChildPartInput
    orderLineItems?: OrderLineItemUncheckedCreateNestedManyWithoutPartInput
    materialConsumptions?: MaterialConsumptionUncheckedCreateNestedManyWithoutMaterialPartInput
  }

  export type PartCreateOrConnectWithoutParentBOMsInput = {
    where: PartWhereUniqueInput
    create: XOR<PartCreateWithoutParentBOMsInput, PartUncheckedCreateWithoutParentBOMsInput>
  }

  export type PartCreateWithoutChildBOMsInput = {
    id?: string
    partNumber: string
    partName: string
    partType: $Enums.PartType
    drawingNumber?: string | null
    revisionLevel?: string | null
    description?: string | null
    materialSpec?: string | null
    unitOfMeasure?: string | null
    standardCost?: Decimal | DecimalJsLike | number | string | null
    leadTime?: number | null
    active?: boolean
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parentBOMs?: BOMComponentCreateNestedManyWithoutParentPartInput
    orderLineItems?: OrderLineItemCreateNestedManyWithoutPartInput
    materialConsumptions?: MaterialConsumptionCreateNestedManyWithoutMaterialPartInput
  }

  export type PartUncheckedCreateWithoutChildBOMsInput = {
    id?: string
    partNumber: string
    partName: string
    partType: $Enums.PartType
    drawingNumber?: string | null
    revisionLevel?: string | null
    description?: string | null
    materialSpec?: string | null
    unitOfMeasure?: string | null
    standardCost?: Decimal | DecimalJsLike | number | string | null
    leadTime?: number | null
    active?: boolean
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parentBOMs?: BOMComponentUncheckedCreateNestedManyWithoutParentPartInput
    orderLineItems?: OrderLineItemUncheckedCreateNestedManyWithoutPartInput
    materialConsumptions?: MaterialConsumptionUncheckedCreateNestedManyWithoutMaterialPartInput
  }

  export type PartCreateOrConnectWithoutChildBOMsInput = {
    where: PartWhereUniqueInput
    create: XOR<PartCreateWithoutChildBOMsInput, PartUncheckedCreateWithoutChildBOMsInput>
  }

  export type PartUpsertWithoutParentBOMsInput = {
    update: XOR<PartUpdateWithoutParentBOMsInput, PartUncheckedUpdateWithoutParentBOMsInput>
    create: XOR<PartCreateWithoutParentBOMsInput, PartUncheckedCreateWithoutParentBOMsInput>
    where?: PartWhereInput
  }

  export type PartUpdateToOneWithWhereWithoutParentBOMsInput = {
    where?: PartWhereInput
    data: XOR<PartUpdateWithoutParentBOMsInput, PartUncheckedUpdateWithoutParentBOMsInput>
  }

  export type PartUpdateWithoutParentBOMsInput = {
    id?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    partType?: EnumPartTypeFieldUpdateOperationsInput | $Enums.PartType
    drawingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    revisionLevel?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    materialSpec?: NullableStringFieldUpdateOperationsInput | string | null
    unitOfMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    standardCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    leadTime?: NullableIntFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    childBOMs?: BOMComponentUpdateManyWithoutChildPartNestedInput
    orderLineItems?: OrderLineItemUpdateManyWithoutPartNestedInput
    materialConsumptions?: MaterialConsumptionUpdateManyWithoutMaterialPartNestedInput
  }

  export type PartUncheckedUpdateWithoutParentBOMsInput = {
    id?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    partType?: EnumPartTypeFieldUpdateOperationsInput | $Enums.PartType
    drawingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    revisionLevel?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    materialSpec?: NullableStringFieldUpdateOperationsInput | string | null
    unitOfMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    standardCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    leadTime?: NullableIntFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    childBOMs?: BOMComponentUncheckedUpdateManyWithoutChildPartNestedInput
    orderLineItems?: OrderLineItemUncheckedUpdateManyWithoutPartNestedInput
    materialConsumptions?: MaterialConsumptionUncheckedUpdateManyWithoutMaterialPartNestedInput
  }

  export type PartUpsertWithoutChildBOMsInput = {
    update: XOR<PartUpdateWithoutChildBOMsInput, PartUncheckedUpdateWithoutChildBOMsInput>
    create: XOR<PartCreateWithoutChildBOMsInput, PartUncheckedCreateWithoutChildBOMsInput>
    where?: PartWhereInput
  }

  export type PartUpdateToOneWithWhereWithoutChildBOMsInput = {
    where?: PartWhereInput
    data: XOR<PartUpdateWithoutChildBOMsInput, PartUncheckedUpdateWithoutChildBOMsInput>
  }

  export type PartUpdateWithoutChildBOMsInput = {
    id?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    partType?: EnumPartTypeFieldUpdateOperationsInput | $Enums.PartType
    drawingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    revisionLevel?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    materialSpec?: NullableStringFieldUpdateOperationsInput | string | null
    unitOfMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    standardCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    leadTime?: NullableIntFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentBOMs?: BOMComponentUpdateManyWithoutParentPartNestedInput
    orderLineItems?: OrderLineItemUpdateManyWithoutPartNestedInput
    materialConsumptions?: MaterialConsumptionUpdateManyWithoutMaterialPartNestedInput
  }

  export type PartUncheckedUpdateWithoutChildBOMsInput = {
    id?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    partType?: EnumPartTypeFieldUpdateOperationsInput | $Enums.PartType
    drawingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    revisionLevel?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    materialSpec?: NullableStringFieldUpdateOperationsInput | string | null
    unitOfMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    standardCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    leadTime?: NullableIntFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentBOMs?: BOMComponentUncheckedUpdateManyWithoutParentPartNestedInput
    orderLineItems?: OrderLineItemUncheckedUpdateManyWithoutPartNestedInput
    materialConsumptions?: MaterialConsumptionUncheckedUpdateManyWithoutMaterialPartNestedInput
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

  export type PartCreateWithoutOrderLineItemsInput = {
    id?: string
    partNumber: string
    partName: string
    partType: $Enums.PartType
    drawingNumber?: string | null
    revisionLevel?: string | null
    description?: string | null
    materialSpec?: string | null
    unitOfMeasure?: string | null
    standardCost?: Decimal | DecimalJsLike | number | string | null
    leadTime?: number | null
    active?: boolean
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parentBOMs?: BOMComponentCreateNestedManyWithoutParentPartInput
    childBOMs?: BOMComponentCreateNestedManyWithoutChildPartInput
    materialConsumptions?: MaterialConsumptionCreateNestedManyWithoutMaterialPartInput
  }

  export type PartUncheckedCreateWithoutOrderLineItemsInput = {
    id?: string
    partNumber: string
    partName: string
    partType: $Enums.PartType
    drawingNumber?: string | null
    revisionLevel?: string | null
    description?: string | null
    materialSpec?: string | null
    unitOfMeasure?: string | null
    standardCost?: Decimal | DecimalJsLike | number | string | null
    leadTime?: number | null
    active?: boolean
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parentBOMs?: BOMComponentUncheckedCreateNestedManyWithoutParentPartInput
    childBOMs?: BOMComponentUncheckedCreateNestedManyWithoutChildPartInput
    materialConsumptions?: MaterialConsumptionUncheckedCreateNestedManyWithoutMaterialPartInput
  }

  export type PartCreateOrConnectWithoutOrderLineItemsInput = {
    where: PartWhereUniqueInput
    create: XOR<PartCreateWithoutOrderLineItemsInput, PartUncheckedCreateWithoutOrderLineItemsInput>
  }

  export type FileAttachmentCreateWithoutLineItemInput = {
    id?: string
    fileName: string
    storedFileName: string
    filePath: string
    fileType: string
    mimeType: string
    fileSize: number
    uploadedBy: string
    description?: string | null
    createdAt?: Date | string
  }

  export type FileAttachmentUncheckedCreateWithoutLineItemInput = {
    id?: string
    fileName: string
    storedFileName: string
    filePath: string
    fileType: string
    mimeType: string
    fileSize: number
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
    materialConsumption?: MaterialConsumptionCreateNestedManyWithoutBatchInput
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
    materialConsumption?: MaterialConsumptionUncheckedCreateNestedManyWithoutBatchInput
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

  export type PartUpsertWithoutOrderLineItemsInput = {
    update: XOR<PartUpdateWithoutOrderLineItemsInput, PartUncheckedUpdateWithoutOrderLineItemsInput>
    create: XOR<PartCreateWithoutOrderLineItemsInput, PartUncheckedCreateWithoutOrderLineItemsInput>
    where?: PartWhereInput
  }

  export type PartUpdateToOneWithWhereWithoutOrderLineItemsInput = {
    where?: PartWhereInput
    data: XOR<PartUpdateWithoutOrderLineItemsInput, PartUncheckedUpdateWithoutOrderLineItemsInput>
  }

  export type PartUpdateWithoutOrderLineItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    partType?: EnumPartTypeFieldUpdateOperationsInput | $Enums.PartType
    drawingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    revisionLevel?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    materialSpec?: NullableStringFieldUpdateOperationsInput | string | null
    unitOfMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    standardCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    leadTime?: NullableIntFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentBOMs?: BOMComponentUpdateManyWithoutParentPartNestedInput
    childBOMs?: BOMComponentUpdateManyWithoutChildPartNestedInput
    materialConsumptions?: MaterialConsumptionUpdateManyWithoutMaterialPartNestedInput
  }

  export type PartUncheckedUpdateWithoutOrderLineItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    partType?: EnumPartTypeFieldUpdateOperationsInput | $Enums.PartType
    drawingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    revisionLevel?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    materialSpec?: NullableStringFieldUpdateOperationsInput | string | null
    unitOfMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    standardCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    leadTime?: NullableIntFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentBOMs?: BOMComponentUncheckedUpdateManyWithoutParentPartNestedInput
    childBOMs?: BOMComponentUncheckedUpdateManyWithoutChildPartNestedInput
    materialConsumptions?: MaterialConsumptionUncheckedUpdateManyWithoutMaterialPartNestedInput
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
    storedFileName?: StringFilter<"FileAttachment"> | string
    filePath?: StringFilter<"FileAttachment"> | string
    fileType?: StringFilter<"FileAttachment"> | string
    mimeType?: StringFilter<"FileAttachment"> | string
    fileSize?: IntFilter<"FileAttachment"> | number
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
    quantity: number
    unitPrice?: Decimal | DecimalJsLike | number | string | null
    dueDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    purchaseOrder: PurchaseOrderCreateNestedOneWithoutLineItemsInput
    part: PartCreateNestedOneWithoutOrderLineItemsInput
    batches?: BatchCreateNestedManyWithoutLineItemInput
  }

  export type OrderLineItemUncheckedCreateWithoutFileAttachmentsInput = {
    id?: string
    orderId: string
    partId: string
    quantity: number
    unitPrice?: Decimal | DecimalJsLike | number | string | null
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
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchaseOrder?: PurchaseOrderUpdateOneRequiredWithoutLineItemsNestedInput
    part?: PartUpdateOneRequiredWithoutOrderLineItemsNestedInput
    batches?: BatchUpdateManyWithoutLineItemNestedInput
  }

  export type OrderLineItemUncheckedUpdateWithoutFileAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    batches?: BatchUncheckedUpdateManyWithoutLineItemNestedInput
  }

  export type OrderLineItemCreateWithoutBatchesInput = {
    id?: string
    quantity: number
    unitPrice?: Decimal | DecimalJsLike | number | string | null
    dueDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    purchaseOrder: PurchaseOrderCreateNestedOneWithoutLineItemsInput
    part: PartCreateNestedOneWithoutOrderLineItemsInput
    fileAttachments?: FileAttachmentCreateNestedManyWithoutLineItemInput
  }

  export type OrderLineItemUncheckedCreateWithoutBatchesInput = {
    id?: string
    orderId: string
    partId: string
    quantity: number
    unitPrice?: Decimal | DecimalJsLike | number | string | null
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

  export type MaterialConsumptionCreateWithoutBatchInput = {
    id?: string
    quantityUsed: Decimal | DecimalJsLike | number | string
    unitCost?: Decimal | DecimalJsLike | number | string | null
    consumedAt?: Date | string
    operatorId?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    materialPart: PartCreateNestedOneWithoutMaterialConsumptionsInput
  }

  export type MaterialConsumptionUncheckedCreateWithoutBatchInput = {
    id?: string
    materialPartId: string
    quantityUsed: Decimal | DecimalJsLike | number | string
    unitCost?: Decimal | DecimalJsLike | number | string | null
    consumedAt?: Date | string
    operatorId?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MaterialConsumptionCreateOrConnectWithoutBatchInput = {
    where: MaterialConsumptionWhereUniqueInput
    create: XOR<MaterialConsumptionCreateWithoutBatchInput, MaterialConsumptionUncheckedCreateWithoutBatchInput>
  }

  export type MaterialConsumptionCreateManyBatchInputEnvelope = {
    data: MaterialConsumptionCreateManyBatchInput | MaterialConsumptionCreateManyBatchInput[]
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
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchaseOrder?: PurchaseOrderUpdateOneRequiredWithoutLineItemsNestedInput
    part?: PartUpdateOneRequiredWithoutOrderLineItemsNestedInput
    fileAttachments?: FileAttachmentUpdateManyWithoutLineItemNestedInput
  }

  export type OrderLineItemUncheckedUpdateWithoutBatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
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

  export type MaterialConsumptionUpsertWithWhereUniqueWithoutBatchInput = {
    where: MaterialConsumptionWhereUniqueInput
    update: XOR<MaterialConsumptionUpdateWithoutBatchInput, MaterialConsumptionUncheckedUpdateWithoutBatchInput>
    create: XOR<MaterialConsumptionCreateWithoutBatchInput, MaterialConsumptionUncheckedCreateWithoutBatchInput>
  }

  export type MaterialConsumptionUpdateWithWhereUniqueWithoutBatchInput = {
    where: MaterialConsumptionWhereUniqueInput
    data: XOR<MaterialConsumptionUpdateWithoutBatchInput, MaterialConsumptionUncheckedUpdateWithoutBatchInput>
  }

  export type MaterialConsumptionUpdateManyWithWhereWithoutBatchInput = {
    where: MaterialConsumptionScalarWhereInput
    data: XOR<MaterialConsumptionUpdateManyMutationInput, MaterialConsumptionUncheckedUpdateManyWithoutBatchInput>
  }

  export type BatchCreateWithoutMaterialConsumptionInput = {
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

  export type BatchUncheckedCreateWithoutMaterialConsumptionInput = {
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

  export type BatchCreateOrConnectWithoutMaterialConsumptionInput = {
    where: BatchWhereUniqueInput
    create: XOR<BatchCreateWithoutMaterialConsumptionInput, BatchUncheckedCreateWithoutMaterialConsumptionInput>
  }

  export type PartCreateWithoutMaterialConsumptionsInput = {
    id?: string
    partNumber: string
    partName: string
    partType: $Enums.PartType
    drawingNumber?: string | null
    revisionLevel?: string | null
    description?: string | null
    materialSpec?: string | null
    unitOfMeasure?: string | null
    standardCost?: Decimal | DecimalJsLike | number | string | null
    leadTime?: number | null
    active?: boolean
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parentBOMs?: BOMComponentCreateNestedManyWithoutParentPartInput
    childBOMs?: BOMComponentCreateNestedManyWithoutChildPartInput
    orderLineItems?: OrderLineItemCreateNestedManyWithoutPartInput
  }

  export type PartUncheckedCreateWithoutMaterialConsumptionsInput = {
    id?: string
    partNumber: string
    partName: string
    partType: $Enums.PartType
    drawingNumber?: string | null
    revisionLevel?: string | null
    description?: string | null
    materialSpec?: string | null
    unitOfMeasure?: string | null
    standardCost?: Decimal | DecimalJsLike | number | string | null
    leadTime?: number | null
    active?: boolean
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parentBOMs?: BOMComponentUncheckedCreateNestedManyWithoutParentPartInput
    childBOMs?: BOMComponentUncheckedCreateNestedManyWithoutChildPartInput
    orderLineItems?: OrderLineItemUncheckedCreateNestedManyWithoutPartInput
  }

  export type PartCreateOrConnectWithoutMaterialConsumptionsInput = {
    where: PartWhereUniqueInput
    create: XOR<PartCreateWithoutMaterialConsumptionsInput, PartUncheckedCreateWithoutMaterialConsumptionsInput>
  }

  export type BatchUpsertWithoutMaterialConsumptionInput = {
    update: XOR<BatchUpdateWithoutMaterialConsumptionInput, BatchUncheckedUpdateWithoutMaterialConsumptionInput>
    create: XOR<BatchCreateWithoutMaterialConsumptionInput, BatchUncheckedCreateWithoutMaterialConsumptionInput>
    where?: BatchWhereInput
  }

  export type BatchUpdateToOneWithWhereWithoutMaterialConsumptionInput = {
    where?: BatchWhereInput
    data: XOR<BatchUpdateWithoutMaterialConsumptionInput, BatchUncheckedUpdateWithoutMaterialConsumptionInput>
  }

  export type BatchUpdateWithoutMaterialConsumptionInput = {
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

  export type BatchUncheckedUpdateWithoutMaterialConsumptionInput = {
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

  export type PartUpsertWithoutMaterialConsumptionsInput = {
    update: XOR<PartUpdateWithoutMaterialConsumptionsInput, PartUncheckedUpdateWithoutMaterialConsumptionsInput>
    create: XOR<PartCreateWithoutMaterialConsumptionsInput, PartUncheckedCreateWithoutMaterialConsumptionsInput>
    where?: PartWhereInput
  }

  export type PartUpdateToOneWithWhereWithoutMaterialConsumptionsInput = {
    where?: PartWhereInput
    data: XOR<PartUpdateWithoutMaterialConsumptionsInput, PartUncheckedUpdateWithoutMaterialConsumptionsInput>
  }

  export type PartUpdateWithoutMaterialConsumptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    partType?: EnumPartTypeFieldUpdateOperationsInput | $Enums.PartType
    drawingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    revisionLevel?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    materialSpec?: NullableStringFieldUpdateOperationsInput | string | null
    unitOfMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    standardCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    leadTime?: NullableIntFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentBOMs?: BOMComponentUpdateManyWithoutParentPartNestedInput
    childBOMs?: BOMComponentUpdateManyWithoutChildPartNestedInput
    orderLineItems?: OrderLineItemUpdateManyWithoutPartNestedInput
  }

  export type PartUncheckedUpdateWithoutMaterialConsumptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    partType?: EnumPartTypeFieldUpdateOperationsInput | $Enums.PartType
    drawingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    revisionLevel?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    materialSpec?: NullableStringFieldUpdateOperationsInput | string | null
    unitOfMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    standardCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    leadTime?: NullableIntFieldUpdateOperationsInput | number | null
    active?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentBOMs?: BOMComponentUncheckedUpdateManyWithoutParentPartNestedInput
    childBOMs?: BOMComponentUncheckedUpdateManyWithoutChildPartNestedInput
    orderLineItems?: OrderLineItemUncheckedUpdateManyWithoutPartNestedInput
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
    materialConsumption?: MaterialConsumptionCreateNestedManyWithoutBatchInput
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
    materialConsumption?: MaterialConsumptionUncheckedCreateNestedManyWithoutBatchInput
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
    materialConsumption?: MaterialConsumptionUpdateManyWithoutBatchNestedInput
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
    materialConsumption?: MaterialConsumptionUncheckedUpdateManyWithoutBatchNestedInput
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
    materialConsumption?: MaterialConsumptionCreateNestedManyWithoutBatchInput
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
    materialConsumption?: MaterialConsumptionUncheckedCreateNestedManyWithoutBatchInput
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
    materialConsumption?: MaterialConsumptionUpdateManyWithoutBatchNestedInput
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
    materialConsumption?: MaterialConsumptionUncheckedUpdateManyWithoutBatchNestedInput
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
    partId: string
    quantity: number
    unitPrice?: Decimal | DecimalJsLike | number | string | null
    dueDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderLineItemUpdateWithoutPurchaseOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    part?: PartUpdateOneRequiredWithoutOrderLineItemsNestedInput
    fileAttachments?: FileAttachmentUpdateManyWithoutLineItemNestedInput
    batches?: BatchUpdateManyWithoutLineItemNestedInput
  }

  export type OrderLineItemUncheckedUpdateWithoutPurchaseOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fileAttachments?: FileAttachmentUncheckedUpdateManyWithoutLineItemNestedInput
    batches?: BatchUncheckedUpdateManyWithoutLineItemNestedInput
  }

  export type OrderLineItemUncheckedUpdateManyWithoutPurchaseOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BOMComponentCreateManyParentPartInput = {
    id?: string
    childPartId: string
    quantity: Decimal | DecimalJsLike | number | string
    unitOfMeasure?: string | null
    scrapFactor?: Decimal | DecimalJsLike | number | string | null
    operation?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BOMComponentCreateManyChildPartInput = {
    id?: string
    parentPartId: string
    quantity: Decimal | DecimalJsLike | number | string
    unitOfMeasure?: string | null
    scrapFactor?: Decimal | DecimalJsLike | number | string | null
    operation?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderLineItemCreateManyPartInput = {
    id?: string
    orderId: string
    quantity: number
    unitPrice?: Decimal | DecimalJsLike | number | string | null
    dueDate?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MaterialConsumptionCreateManyMaterialPartInput = {
    id?: string
    batchId: string
    quantityUsed: Decimal | DecimalJsLike | number | string
    unitCost?: Decimal | DecimalJsLike | number | string | null
    consumedAt?: Date | string
    operatorId?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BOMComponentUpdateWithoutParentPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitOfMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    scrapFactor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    operation?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    childPart?: PartUpdateOneRequiredWithoutChildBOMsNestedInput
  }

  export type BOMComponentUncheckedUpdateWithoutParentPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    childPartId?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitOfMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    scrapFactor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    operation?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BOMComponentUncheckedUpdateManyWithoutParentPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    childPartId?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitOfMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    scrapFactor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    operation?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BOMComponentUpdateWithoutChildPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitOfMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    scrapFactor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    operation?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentPart?: PartUpdateOneRequiredWithoutParentBOMsNestedInput
  }

  export type BOMComponentUncheckedUpdateWithoutChildPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    parentPartId?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitOfMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    scrapFactor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    operation?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BOMComponentUncheckedUpdateManyWithoutChildPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    parentPartId?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitOfMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    scrapFactor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    operation?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderLineItemUpdateWithoutPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchaseOrder?: PurchaseOrderUpdateOneRequiredWithoutLineItemsNestedInput
    fileAttachments?: FileAttachmentUpdateManyWithoutLineItemNestedInput
    batches?: BatchUpdateManyWithoutLineItemNestedInput
  }

  export type OrderLineItemUncheckedUpdateWithoutPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fileAttachments?: FileAttachmentUncheckedUpdateManyWithoutLineItemNestedInput
    batches?: BatchUncheckedUpdateManyWithoutLineItemNestedInput
  }

  export type OrderLineItemUncheckedUpdateManyWithoutPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaterialConsumptionUpdateWithoutMaterialPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantityUsed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    consumedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    batch?: BatchUpdateOneRequiredWithoutMaterialConsumptionNestedInput
  }

  export type MaterialConsumptionUncheckedUpdateWithoutMaterialPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    quantityUsed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    consumedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaterialConsumptionUncheckedUpdateManyWithoutMaterialPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    quantityUsed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    consumedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileAttachmentCreateManyLineItemInput = {
    id?: string
    fileName: string
    storedFileName: string
    filePath: string
    fileType: string
    mimeType: string
    fileSize: number
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
    storedFileName?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    uploadedBy?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileAttachmentUncheckedUpdateWithoutLineItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    storedFileName?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    uploadedBy?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileAttachmentUncheckedUpdateManyWithoutLineItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    storedFileName?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
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
    materialConsumption?: MaterialConsumptionUpdateManyWithoutBatchNestedInput
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
    materialConsumption?: MaterialConsumptionUncheckedUpdateManyWithoutBatchNestedInput
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

  export type MaterialConsumptionCreateManyBatchInput = {
    id?: string
    materialPartId: string
    quantityUsed: Decimal | DecimalJsLike | number | string
    unitCost?: Decimal | DecimalJsLike | number | string | null
    consumedAt?: Date | string
    operatorId?: string | null
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

  export type MaterialConsumptionUpdateWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantityUsed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    consumedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    materialPart?: PartUpdateOneRequiredWithoutMaterialConsumptionsNestedInput
  }

  export type MaterialConsumptionUncheckedUpdateWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    materialPartId?: StringFieldUpdateOperationsInput | string
    quantityUsed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    consumedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaterialConsumptionUncheckedUpdateManyWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    materialPartId?: StringFieldUpdateOperationsInput | string
    quantityUsed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    consumedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
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