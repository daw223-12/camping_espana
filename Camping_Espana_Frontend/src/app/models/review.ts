export interface Review {
    user_id?: number | null; 
    place_id: number; 
    score: number; 
    comment: string;
    created_at?: string | null; 
    updated_at?: string | null; 
}
