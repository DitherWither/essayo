create table users (
    user_id      uuid primary key                  default gen_random_uuid(),

    full_name    varchar(255) not null check (length(full_name) >= 4),
    password     varchar(255) not null,            
    email        varchar(255) not null unique check (email ~ '^[a-zA-Z0-9_+&-]+(?:.[a-zA-Z0-9_+&-]+)*@(?:[a-zA-Z0-9-]+.)+[a-zA-Z]{2,7}$'),

    created_at   timestamp with time zone not null default now(),
    updated_at   timestamp with time zone not null default now()
);

create table posts (
    post_id      uuid primary key default gen_random_uuid(),

    title        varchar(255) not null check (length(title) >= 4),
    body         text not null,
    description  text,

    user_id      uuid references users(user_id) on delete set null,

    created_at   timestamp with time zone not null default now(),
    updated_at   timestamp with time zone not null default now()
);

create function update_timestamp_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language 'plpgsql';

create trigger user_updated before update 
on users for each row execute procedure 
update_timestamp_column();
 

create trigger post_updated before update 
on posts for each row execute procedure 
update_timestamp_column();


