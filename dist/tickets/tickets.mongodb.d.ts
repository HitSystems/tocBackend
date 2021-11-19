export declare function getTicketByID(idTicket: number): Promise<any>;
export declare function getTicketsIntervalo(inicioTime: number, finalTime: number): Promise<any>;
export declare function getTickets(): Promise<any>;
export declare function getDedudaDeliveroo(inicioTime: number, finalTime: number): Promise<number>;
export declare function getDedudaGlovo(inicioTime: number, finalTime: number): Promise<number>;
export declare function getTotalTkrs(inicioTime: number, finalTime: number): Promise<number>;
export declare function getUltimoTicket(): Promise<number>;
export declare function nuevoTicket(ticket: any): Promise<import("mongodb").InsertOneResult<import("bson").Document>>;
