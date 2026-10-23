export const gameSaveKeys=['ontario-day-v1','ontario-house-reads','ontario-morning-v1','ontario-outing-v1','ontario-afternoon-v1','ontario-open-house-v1','ontario-missions-v1'];
export function resetGame(storage){for(const key of gameSaveKeys)storage.removeItem(key);}
