<script>
	import { ID } from 'appwrite';

	import { account } from '$services/appwrite';

	import AppHandle from '$ui/AppHandle.svelte';
	import { Button } from '$ui/button';
	import * as Card from '$ui/card';
	import { FieldGroup, Field, FieldSeparator, FieldLabel, FieldDescription } from '$ui/field';
	import { Input } from '$ui/input';

	import AppleIcon from '$icons/AppleIcon.svelte';
	import GoogleIcon from '$icons/GoogleIcon.svelte';

	let userId = $state();
	let email = $state('');
	let code = $state();
	let sessionToken = $state();
	let codeRequested = $state(false);
</script>

<div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
	<div class="flex w-full max-w-sm flex-col gap-6">
		<AppHandle class="justify-center" />

		<div class="flex flex-col gap-6">
			<Card.Root>
				<Card.Header class="text-center">
					<Card.Title class="text-xl">Welcome</Card.Title>
					<Card.Description>Login with your Apple or Google account</Card.Description>
				</Card.Header>

				<Card.Content>
					<form
						onsubmit={async (e) => {
							e.preventDefault();

							if (!codeRequested) {
								userId = ID.unique();

								sessionToken = await account.createEmailToken({
									userId,
									email
								});

								if (sessionToken) {
									codeRequested = true;
								}
							} else {
								const session = await account.createSession({
									userId,
									secret: code
								});

								console.log(session);
							}
						}}
					>
						<FieldGroup>
							<Field>
								<Button variant="outline" type="button"><AppleIcon />Continue with Apple</Button>
								<Button variant="outline" type="button"><GoogleIcon />Continue with Google</Button>
							</Field>

							<FieldSeparator class="*:data-[slot=field-separator-content]:bg-card">
								or continue with
							</FieldSeparator>

							{#if !codeRequested}
								<Field>
									<FieldLabel for="email">Email</FieldLabel>
									<Input
										id="email"
										type="email"
										placeholder="m@example.com"
										required
										bind:value={email}
									/>
								</Field>
							{:else}
								<Field>
									<FieldLabel for="code">Enter code</FieldLabel>
									<Input id="code" type="text" placeholder="123456" required bind:value={code} />
								</Field>
							{/if}

							<Field>
								<Button type="submit">Login</Button>
								<FieldDescription class="text-center">
									Don't have an account? <a href="##">Sign up</a>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</Card.Content>
			</Card.Root>

			<FieldDescription class="px-6 text-center">
				By clicking continue, you agree to our <a href="##">Terms of Service</a>
				and <a href="##">Privacy Policy</a>.
			</FieldDescription>
		</div>
	</div>
</div>
