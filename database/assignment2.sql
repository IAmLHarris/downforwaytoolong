-- T.Stark Insert
INSERT INTO public.account (account_firstname, account_lastname, account_email ,account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- T.Stark Update
UPDATE public.account 
set account_type = 'Admin' where account_id = 1

-- T.Stark Delete
DELETE FROM public.account WHERE account_id = 1

--GM Hummer Update
UPDATE public.inventory
set inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior' ) 
WHERE inv_model = 'Hummer'

--Sport Inner Join 
SELECT
    
inventory.inv_model, 
	inventory.inv_make,
classification.classification_name
FROM
    public.inventory

INNER JOIN public.classification 
   ON inventory.classification_id = classification.classification_id 
WHERE classification_name = 'Sport';

--Image Path Update
UPDATE public.inventory
set inv_image = REPLACE( inv_image, '/images', '/images/vehicles' ) 

UPDATE public.inventory
set inv_thumbnail = REPLACE( inv_thumbnail, '/images', '/images/vehicles' ) 