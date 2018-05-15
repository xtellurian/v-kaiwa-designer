
export interface NPC {
    name: string;
    respondsTo: Intent[];
    inititialPhrase?: string;
}

export interface Intent {
    name: string;
    responses: string[];
}

export const AvailableIntents: string[] = ['HelpMe', 'GiveItem', 'AskForItem'];

export const AvailableNpcs: string[] = ['Pat', 'Mr Hot Dog'];