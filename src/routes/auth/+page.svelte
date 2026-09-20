<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	import AppHandle from '$ui/AppHandle.svelte';
	import { Button } from '$ui/button';
	import * as Card from '$ui/card';
	import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from '$ui/field';
	import { Input } from '$ui/input';

	import AppleIcon from '$icons/AppleIcon.svelte';
	import GoogleIcon from '$icons/GoogleIcon.svelte';

	import { authentication } from '$lib/features/identity/client';
	import { i18n } from '$lib/i18n/index.svelte';

	type Phase = 'email' | 'code';

	let phase = $state<Phase>('email');
	let userId = $state('');
	let email = $state('');
	let code = $state('');
	let securityPhrase = $state('');
	let errorMessage = $state('');
	let isSubmitting = $state(false);

	function getErrorMessage(_error: unknown): string {
		return i18n.t.auth.genericError;
	}

	async function requestCode(): Promise<void> {
		errorMessage = '';
		isSubmitting = true;

		try {
			const challenge = await authentication.requestEmailCode({ email });

			userId = challenge.userId;
			securityPhrase = challenge.securityPhrase ?? '';
			code = '';
			phase = 'code';
		} catch (error) {
			errorMessage = getErrorMessage(error);
		} finally {
			isSubmitting = false;
		}
	}

	async function verifyCode(): Promise<void> {
		errorMessage = '';
		isSubmitting = true;

		try {
			await authentication.verifyEmailCode({ userId, code });
			await goto(resolve('/app/dashboard'));
		} catch (error) {
			errorMessage = getErrorMessage(error);
		} finally {
			isSubmitting = false;
		}
	}

	function changeEmail(): void {
		phase = 'email';
		userId = '';
		code = '';
		securityPhrase = '';
		errorMessage = '';
	}

	function handleSubmit(event: SubmitEvent): void {
		event.preventDefault();
		void (phase === 'email' ? requestCode() : verifyCode());
	}
</script>

<div class="flex min-h-svh w-full flex-col items-center justify-center gap-6 p-6 md:p-10">
	<div class="flex w-full max-w-sm flex-col gap-6">
		<AppHandle class="justify-center" />

		<div class="flex flex-col gap-6">
			<Card.Root>
				<Card.Header class="text-center">
					<Card.Title class="text-xl">{i18n.t.auth.title}</Card.Title>
					<Card.Description>{i18n.t.auth.description}</Card.Description>
				</Card.Header>

				<Card.Content>
					<form data-testid="auth-form" onsubmit={handleSubmit}>
						<FieldGroup>
							<Field>
								<Button variant="outline" type="button">
									<AppleIcon />
									{i18n.t.auth.oauthButton('Apple')}
								</Button>

								<Button variant="outline" type="button">
									<GoogleIcon />
									{i18n.t.auth.oauthButton('Google')}
								</Button>
							</Field>

							<FieldSeparator class="*:data-[slot=field-separator-content]:bg-card">
								{i18n.t.auth.separator}
							</FieldSeparator>

							{#if phase === 'email'}
								<Field>
									<FieldLabel for="email">{i18n.t.auth.emailInputLbl}</FieldLabel>
									<Input
										id="email"
										type="email"
										placeholder="m@example.com"
										autocomplete="email"
										required
										disabled={isSubmitting}
										bind:value={email}
									/>
								</Field>
							{:else}
								<Field>
									<FieldLabel for="code">{i18n.t.auth.codeInputLbl}</FieldLabel>
									<Input
										id="code"
										type="text"
										inputmode="numeric"
										autocomplete="one-time-code"
										pattern="[0-9]{6}"
										maxlength={6}
										placeholder="123456"
										required
										disabled={isSubmitting}
										bind:value={code}
									/>
									<FieldDescription>{i18n.t.auth.codeSent(email)}</FieldDescription>
									{#if securityPhrase}
										<FieldDescription>{i18n.t.auth.securityPhrase(securityPhrase)}</FieldDescription
										>
									{/if}
								</Field>
							{/if}

							{#if errorMessage}
								<FieldError>{errorMessage}</FieldError>
							{/if}

							<Field>
								<Button type="submit" disabled={isSubmitting}>
									{phase === 'email' ? i18n.t.auth.requestCodeBtn : i18n.t.auth.verifyCodeBtn}
								</Button>

								{#if phase === 'code'}
									<div class="flex justify-center gap-2">
										<Button
											type="button"
											variant="ghost"
											size="sm"
											disabled={isSubmitting}
											onclick={requestCode}
										>
											{i18n.t.auth.resendCodeBtn}
										</Button>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											disabled={isSubmitting}
											onclick={changeEmail}
										>
											{i18n.t.auth.changeEmailBtn}
										</Button>
									</div>
								{/if}

								<Button type="button" variant="outline">Continue as a guest</Button>
							</Field>
						</FieldGroup>
					</form>
				</Card.Content>
			</Card.Root>

			<FieldDescription class="px-6 text-center">
				By logging in, you agree to our <a href="##">Terms of Service</a>
				and <a href="##">Privacy Policy</a>.
			</FieldDescription>
		</div>
	</div>
</div>
