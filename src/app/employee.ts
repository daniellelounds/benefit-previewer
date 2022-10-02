import { Contact } from "./contact";

export interface Employee extends Contact {
    // TODO: update dependents to use Dependent model that extends Contact with a relationship type: wife, child...
    dependents: Contact[];
}
